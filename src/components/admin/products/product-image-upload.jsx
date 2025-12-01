"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MediaService } from "@/services/media-service";
import { toast } from "sonner";

/**
 * ProductImageUpload Component
 * Handles product image upload and selection from media library
 * Extracted from add product page for better organization
 */
export function ProductImageUpload({ 
  uploadedImages, 
  setUploadedImages,
  allMedia,
  setAllMedia 
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileType", "image");

        const response = await MediaService.upload(formData);
        if (response.success && response.data?.media) {
          setUploadedImages((prev) => [...prev, response.data.media]);
          setAllMedia((prev) => [...prev, response.data.media]);
        }
      }
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const toggleImageSelection = (media) => {
    if (uploadedImages.some((img) => img.id === media.id)) {
      removeImage(media.id);
    } else {
      setUploadedImages((prev) => [...prev, media]);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Product Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Section */}
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div className="mt-4">
              <label htmlFor="images" className="cursor-pointer">
                <span className="mt-2 block text-sm font-medium text-foreground">
                  {isUploading ? "Uploading..." : "Drop images here or click to upload"}
                </span>
                <input
                  id="images"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
            </div>
          </div>

          {/* Select from Media Library Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsMediaModalOpen(true)}
            className="w-full"
          >
            <ImageIcon className="h-4 w-4 mr-2" />
            Select from Media Library ({allMedia.length} available)
          </Button>

          {/* Selected Images */}
          {uploadedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <Image
                    src={image.url}
                    width={100}
                    height={100}
                    alt={image.file_name || "Product image"}
                    className="w-full h-24 object-cover rounded-lg border border-border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeImage(image.id)}
                    type="button"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {uploadedImages.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              No images selected yet. Upload or select at least one product image.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Media Library Selection Modal */}
      <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Select Images from Media Library</DialogTitle>
          </DialogHeader>
          <div className="max-h-[500px] overflow-y-auto">
            {allMedia.length === 0 ? (
              <div className="text-muted-foreground py-8 text-center">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p>No media available in library</p>
                <p className="text-sm mt-2">Upload images to see them here</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
                {allMedia.map((media) => (
                  <div
                    key={media.id}
                    className={`cursor-pointer relative border-2 rounded-lg overflow-hidden transition ${
                      uploadedImages.some((img) => img.id === media.id)
                        ? "border-primary bg-primary/10 ring-2 ring-primary"
                        : "border-border hover:border-primary"
                    }`}
                    onClick={() => toggleImageSelection(media)}
                  >
                    <Image
                      src={media.url}
                      width={100}
                      height={100}
                      alt={media.file_name || "Media"}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition flex items-center justify-center">
                      {uploadedImages.some((img) => img.id === media.id) && (
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter>
            <p className="text-sm text-muted-foreground mr-auto">
              {uploadedImages.length} image(s) selected
            </p>
            <Button onClick={() => setIsMediaModalOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

