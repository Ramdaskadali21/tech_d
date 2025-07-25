import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  Video, 
  Download, 
  ExternalLink,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const FileViewer = ({ file, className = "" }) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!file || !file.url) {
    return null;
  }

  const getFileType = (url) => {
    const extension = url.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return 'image';
    } else if (['mp4', 'webm', 'ogg', 'avi', 'mov'].includes(extension)) {
      return 'video';
    } else if (['pdf'].includes(extension)) {
      return 'pdf';
    }
    return 'unknown';
  };

  const fileType = getFileType(file.url);
  const fileName = file.name || file.url.split('/').pop();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = file.url;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

  const renderFileIcon = () => {
    switch (fileType) {
      case 'image':
        return <Image className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'pdf':
        return <FileText className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const renderPreview = () => {
    switch (fileType) {
      case 'image':
        return (
          <div className="relative group">
            <img
              src={file.url}
              alt={file.alt || fileName}
              className="w-full h-48 object-cover rounded-lg cursor-pointer transition-opacity hover:opacity-80"
              onClick={() => setIsViewerOpen(true)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
              <Button
                variant="secondary"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setIsViewerOpen(true)}
              >
                <Maximize2 className="w-4 h-4 mr-2" />
                View Full Size
              </Button>
            </div>
          </div>
        );
      
      case 'video':
        return (
          <div className="relative">
            <video
              controls
              className="w-full h-48 object-cover rounded-lg"
              preload="metadata"
            >
              <source src={file.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      
      case 'pdf':
        return (
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">PDF Document</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => window.open(file.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open PDF
              </Button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">File</p>
            </div>
          </div>
        );
    }
  };

  const renderFullViewer = () => {
    if (fileType !== 'image') return null;

    return (
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-4 pb-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">
                {fileName}
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm font-medium">{zoom}%</span>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleRotate}>
                  <RotateCw className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Reset
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="p-4 overflow-auto max-h-[calc(90vh-80px)]">
            <div className="flex items-center justify-center">
              <img
                src={file.url}
                alt={file.alt || fileName}
                className="max-w-full h-auto"
                style={{
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease'
                }}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              {renderFileIcon()}
              <div>
                <h4 className="font-medium text-sm">{fileName}</h4>
                <p className="text-xs text-muted-foreground capitalize">
                  {fileType} file
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
          
          {renderPreview()}
          
          {file.description && (
            <p className="text-sm text-muted-foreground mt-3">
              {file.description}
            </p>
          )}
        </CardContent>
      </Card>
      
      {renderFullViewer()}
    </>
  );
};

export default FileViewer;

