"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Trash2,
  Upload,
  Folder,
  FolderPlus,
  ChevronRight,
  ArrowLeft,
  File,
  Download,
} from "lucide-react";
import { MediaService } from "@/services/media-service";



export default function MediaManager() {
  const [mediaList, setMediaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("image");
  const [newFolderName, setNewFolderName] = useState("");
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);

  // Load initial media
  React.useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setIsLoading(true);
    try {
      const response = await MediaService.getAll();
      // Handle the response structure from your API
      const mediaData = response?.data?.mediaList || response?.mediaList || [];
      // Add type property to distinguish files from folders
      const processedMedia = mediaData.map(item => ({
        ...item,
        type: item.type || "file" // Default to file if type is not specified
      }));
      setMediaList(processedMedia);
    } catch (error) {
      console.error("Error loading media:", error);
      setMediaList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", fileType);
      const response = await MediaService.upload(formData);
      
      if (response?.success) {
        setFile(null);
        // Reload media list to show newly uploaded file
        await loadMedia();
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(id);
    try {
      const response = await MediaService.delete(id);
      
      if (response?.success) {
        // Remove from local state immediately
        setMediaList(mediaList.filter(item => item.id !== id));
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete media. Please try again.");
      // Reload to ensure consistency
      await loadMedia();
    } finally {
      setIsDeleting(null);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const result = await MediaService.createFolder(newFolderName);
      setMediaList([
        ...mediaList,
        {
          id: result.id,
          file_name: newFolderName,
          type: "folder",
          created_at: new Date().toISOString(),
        },
      ]);
      setNewFolderName("");
      setShowNewFolderInput(false);
    } catch (error) {
      console.error("Folder creation error:", error);
    }
  };

  const handleFolderOpen = (folderId, folderName) => {
    setCurrentPath([...currentPath, { id: folderId, name: folderName }]);
  };

  const handleNavigateBack = () => {
    setCurrentPath(currentPath.slice(0, -1));
  };

  const handleNavigateTo = (index) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const formatFileSize = (bytes) => {
    const kb = parseInt(bytes) / 1024;
    return kb > 1024 ? (kb / 1024).toFixed(1) + " MB" : kb.toFixed(1) + " KB";
  };

  const currentPathStr = currentPath.map((p) => p.name).join(" / ");

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Upload Section */}
      <Card className="border-2">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Media
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <Input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="flex-1"
            />
            <select
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="border rounded-md px-3 py-2 text-sm min-w-fit"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="document">Document</option>
            </select>
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className="min-w-fit"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

  
      {/* Media List with Navigation */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              {currentPathStr ? "Media / " + currentPathStr : "All Media"}
            </CardTitle>
            {currentPath.length > 0 && (
              <Button onClick={handleNavigateBack} variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
          </div>

          {/* Breadcrumb Navigation */}
          {currentPath.length > 0 && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 flex-wrap">
              <button
                onClick={() => setCurrentPath([])}
                className="hover:text-blue-600 underline"
              >
                Root
              </button>
              {currentPath.map((path, idx) => (
                <React.Fragment key={path.id}>
                  <ChevronRight className="h-3 w-3" />
                  <button
                    onClick={() => handleNavigateTo(idx)}
                    className="hover:text-blue-600 underline"
                  >
                    {path.name}
                  </button>
                </React.Fragment>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-6">
          {isLoading ? (
            <div className="text-center text-gray-500 py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
              Loading media...
            </div>
          ) : mediaList.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mediaList.map((item) => (
                <div
                  key={item.id}
                  className="relative border rounded-lg overflow-hidden group hover:shadow-lg transition-all"
                >
                  {item.type === "folder" ? (
                    <div
                      onClick={() => handleFolderOpen(item.id, item.file_name)}
                      className="cursor-pointer bg-amber-50 hover:bg-amber-100 p-6 h-40 flex items-center justify-center transition"
                    >
                      <div className="text-center">
                        <Folder className="h-12 w-12 mx-auto text-amber-500 mb-2" />
                        <p className="text-sm font-medium truncate px-2">{item.file_name}</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-gray-100 h-40 flex items-center justify-center overflow-hidden">
                        {item.mime_type?.startsWith("image") ? (
                          <img
                            src={item.url}
                            alt={item.file_name}
                            className="object-cover w-full h-full"
                          />
                        ) : item.mime_type?.startsWith("video") ? (
                          <video
                            src={item.url}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center gap-2">
                            <File className="h-8 w-8 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {item.mime_type || "File"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-3 bg-white">
                        <p
                          className="text-xs font-medium truncate"
                          title={item.file_name}
                        >
                          {item.file_name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(item.size_bytes)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </>
                  )}

                  {/* Actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition flex gap-1">
                    {item.type !== "folder" && (
                      <a
                        href={item.url}
                        download
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md inline-flex"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    )}
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting === item.id}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md disabled:opacity-50"
                      title="Delete"
                    >
                      {isDeleting === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <Folder className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No media or folders here yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}