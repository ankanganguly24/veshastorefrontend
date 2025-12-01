/**
 * Image Utility Functions
 * Helpers for selecting appropriate image sizes from API responses
 */

/**
 * Get the best image URL based on device size and desired resolution
 * @param {Object} mediaItem - Media item from API with variants
 * @param {string} size - Desired size: 'thumbnail', 'medium', 'large', 'original'
 * @param {string} resolution - Desired resolution: '360p', '640p', '720p', '1080p'
 * @returns {string} - Image URL
 */
export function getResponsiveImageUrl(mediaItem, size = 'medium', resolution = '720p') {
  if (!mediaItem || !mediaItem.media) return null;

  const media = mediaItem.media;
  
  // Try to find the variant with matching size and resolution
  if (media.variants && Array.isArray(media.variants)) {
    const variant = media.variants.find(
      v => v.variant_key === size && v.metadata?.resolution === resolution
    );
    
    if (variant) return variant.url;
    
    // Fallback: find any variant with matching size
    const sizeVariant = media.variants.find(v => v.variant_key === size);
    if (sizeVariant) return sizeVariant.url;
  }
  
  // Fallback to original URL
  return media.url;
}

/**
 * Get multiple image URLs for responsive srcset
 * @param {Object} mediaItem - Media item from API
 * @param {string} size - Size category: 'thumbnail', 'medium', 'large'
 * @returns {Object} - Object with URLs for different resolutions
 */
export function getResponsiveImageSet(mediaItem, size = 'medium') {
  if (!mediaItem || !mediaItem.media) return null;

  const media = mediaItem.media;
  const imageSet = {
    original: media.url,
    '360p': null,
    '640p': null,
    '720p': null,
    '1080p': null,
  };

  if (media.variants && Array.isArray(media.variants)) {
    media.variants
      .filter(v => v.variant_key === size)
      .forEach(variant => {
        const res = variant.metadata?.resolution;
        if (res && imageSet.hasOwnProperty(res)) {
          imageSet[res] = variant.url;
        }
      });
  }

  return imageSet;
}

/**
 * Get product images with appropriate sizes for product cards
 * @param {Array} mediaArray - Array of media items from product
 * @returns {Array} - Array of image URLs optimized for cards
 */
export function getProductCardImages(mediaArray) {
  if (!Array.isArray(mediaArray) || mediaArray.length === 0) return [];

  return mediaArray
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .map(item => {
      // For product cards, use medium size at 640p for mobile, 720p for desktop
      return getResponsiveImageUrl(item, 'medium', '640p') || 
             getResponsiveImageUrl(item, 'thumbnail', '640p') ||
             item.media?.url;
    })
    .filter(Boolean);
}

/**
 * Get primary product image
 * @param {Array} mediaArray - Array of media items
 * @returns {string} - Primary image URL
 */
export function getPrimaryImage(mediaArray) {
  if (!Array.isArray(mediaArray) || mediaArray.length === 0) return null;

  const primary = mediaArray.find(item => item.is_primary);
  if (primary) {
    return getResponsiveImageUrl(primary, 'medium', '640p') || primary.media?.url;
  }

  // Fallback to first image
  return getResponsiveImageUrl(mediaArray[0], 'medium', '640p') || mediaArray[0].media?.url;
}
