import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../profilepic/profile.service';
import { SkinAnalysisService } from '../services/SkinAnalysis.service';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;

  imagePreview: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  message: string = '';
  messageColor: string = 'black';
  cameraActive: boolean = false;
  streamReference: MediaStream | null = null;
  showCamera: boolean = false;

  loading: boolean = false;
  result: { skinType: string; skinIssue: string; recommendedProducts: string } | null = null;

  constructor(private profileService: ProfileService, private skinAnalysisService: SkinAnalysisService) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.readAndPreviewFile(file);
    }
  }

  readAndPreviewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  toggleCamera(): void {
    this.showCamera = !this.showCamera;
    if (this.showCamera) {
      this.startCamera();
    } else {
      this.stopCamera();
    }
  }

  startCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.cameraActive = true;
          this.streamReference = stream;
          setTimeout(() => {
            if (this.videoElement && this.videoElement.nativeElement) {
              this.videoElement.nativeElement.srcObject = stream;
            }
          }, 0);
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          this.message = 'Cannot access camera. Please check permissions.';
          this.messageColor = 'red';
          this.showCamera = false;
        });
    } else {
      this.message = 'Camera not supported on this device or browser.';
      this.messageColor = 'red';
      this.showCamera = false;
    }
  }

  stopCamera(): void {
    if (this.streamReference) {
      this.streamReference.getTracks().forEach(track => track.stop());
      this.streamReference = null;
    }
    this.cameraActive = false;
  }

  captureImage(): void {
    if (!this.cameraActive || !this.videoElement) return;

    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      this.imagePreview = imageDataUrl;
      this.dataURLtoFile(imageDataUrl, 'camera_capture.jpg');
    }
  }

  dataURLtoFile(dataUrl: string, filename: string): void {
    const arr = dataUrl.split(',');
    if (arr.length < 2) return;

    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    this.selectedFile = new File([u8arr], filename, { type: mime });
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      this.message = 'No image selected or captured!';
      this.messageColor = 'red';
      return;
    }

    this.loading = true;
    this.result = null;
    this.message = '';

    this.skinAnalysisService.uploadSkinImage(this.selectedFile).subscribe({
      next: (response: any) => {
        this.message = 'Skin analysis image uploaded successfully!';
        this.messageColor = 'green';
        sessionStorage.setItem('skin-type', response.prediction.skin_type.predicted_class);
        sessionStorage.setItem('skin-issue', response.prediction.skin_issue.predicted_class);
        sessionStorage.setItem('products', response.prediction.recomended_products);

        this.result = {
          skinType: response.prediction.skin_type.predicted_class,
          skinIssue: response.prediction.skin_issue.predicted_class,
          recommendedProducts: response.prediction.recomended_products,
        };
      },
      error: (err: any) => {
        console.error('Upload failed:', err);
        this.message = `Upload failed: ${err.error?.message || err.statusText}`;
        this.messageColor = 'red';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }
}
