<template>
  <v-card 
    class="rounded-xl !p-6 h-full flex flex-col backdrop-blur-sm transition-all duration-300 animate-fade-in group project-card !bg-black border border-gray-300"
    data-dark="true"
  >
    
    <div class="flex-1 flex flex-col">
      
      <div class="py-6 pb-4">
        
        <h3 class="text-xl md:text-2xl font-bold mb-2 transition-colors duration-300 project-title text-white">
          {{ project.name }}
        </h3>
        
        <div v-if="effectivePreviewSettings.showCategory || effectivePreviewSettings.showStatus" class="flex items-center gap-2 mb-3">
          <v-chip
            size="small"
            v-if="project.category && effectivePreviewSettings.showCategory"
            class="text-xs !font-bold !border-1 !border-orange-400 !bg-[#3A2315] !text-orange-400"
          >
            {{ getCategoryNameLocal(project.category)}}
          </v-chip>
          <v-chip
            size="small"
            v-if="project.status && effectivePreviewSettings.showStatus"
            class="!border-2 !border-green-900 !bg-[#183421] !text-green-500 text-xs"
          >
            {{ getStatusNameLocal(project.status)}}
          </v-chip>
        </div>
        
        <p v-if="project.description && effectivePreviewSettings.showDescription"
        class="text-sm whitespace-pre-wrap text-gray-300">
          {{ project.description}}
        </p>
      </div>

        <div v-if="project.tags && effectivePreviewSettings.showTags" class="md:px-6 px-0 md:pb-4 pb-2">
      <div class="flex flex-wrap gap-2">
        <v-chip
          v-for="tag in (project.tags)"
          :key="tag"
          size="small"
          class="text-xs !font-bold bg-gray-700 text-white"
        >
          {{ tag }}
        </v-chip>
      </div>
    </div>

    <div v-if="effectivePreviewSettings.showAssets" class="md:px-6 px-0 md:pb-4 pb-2">
      <v-sheet class="overflow-hidden rounded-lg" max-width="700">
        <v-carousel
          v-if="mediaAssets.length > 0"
          height="400"
          progress="primary"
          hide-delimiters
          class="!bg-[#212121] rounded-lg"
        >
          <v-carousel-item
            v-for="(file, index) in mediaAssets"
            :key="index"
          >
            <v-sheet
              height="100%"
              class="cursor-pointer"
              @click="openImageModal(file, index)"
            >
              <div class="d-flex fill-height justify-center align-center">
                <img 
                  :src="getFileUrlForPreview(file)"
                  :alt="file.display_name || file.name || 'Image'"
                  class="max-w-full max-h-full object-contain"
                  style="max-height: 100%;"
                />
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-sheet>
    </div>

    <div v-if="project.technologies && effectivePreviewSettings.showTechnologies" class="md:px-6 px-0 md:pb-4 pb-2">
      <h4 v-if="project.technologies.length > 0" class="font-bold md:mb-3 mb-1 text-white">
        Technologies
      </h4>
      <div class="flex flex-wrap gap-2">
        <v-chip
          v-for="tech in (project.technologies)"
          :key="tech"
          size="small"
          class="text-lg !font-bold !border-2 !border-blue-900 !bg-[#23153A] !text-blue-400"
        >
          {{ tech }}
        </v-chip>
      </div>
    </div>

    <div v-if="(project.start_date || project.end_date) && effectivePreviewSettings.showDates" class="md:px-6 px-0 md:pb-6 pb-2">
      <div class="flex items-center gap-2 text-sm">
        <v-icon 
          size="16" 
          color="gray-300"
        >
          mdi-calendar
        </v-icon>
        <span class="transition-colors text-gray-300">
          {{ formatDate(project.start_date || '')}} 
          {{ project.end_date ? `- ${formatDate(project.end_date)}` : '' }}
        </span>
      </div>
    </div>

    
    <div v-if="documentAssets.length > 0 && effectivePreviewSettings.showAssets" class="md:px-6 px-0 md:pb-6 pb-2">
      <div class="flex items-center gap-2 mb-3">
        <v-icon 
          size="16" 
          color="gray-300"
        >
          mdi-file-document-multiple
        </v-icon>
        <h4 class="font-bold text-white">
          Documents
        </h4>
      </div>
      <div class="flex flex-wrap gap-2">
        <v-chip
          v-for="document in documentAssets"
          :key="document.id || document.name"
          size="small"
          variant="outlined"
          class="cursor-pointer hover:bg-gray-800 transition-colors border-gray-600 text-gray-300"
          @click="openDocument(document)"
        >
          <v-icon 
            :icon="getFileIcon(document.type || document.name || '')" 
            :color="getFileColor(document.type || document.name || '')"
            size="small"
            class="mr-1"
          />
          <span class="text-xs">{{ document.display_name || document.name || 'Document' }}</span>
          <v-icon 
            icon="mdi-download" 
            size="x-small" 
            class="ml-1 text-gray-500"
          />
        </v-chip>
      </div>
    </div>
    </div>

    <div  v-if="(githubLink || demoLink || additionalLinks.length) && effectivePreviewSettings.showLinks" class="md:px-6 px-0 md:py-6 py-2 md:pb-0 pb-2 border-t border-gray-400">
      <div class="flex flex-col gap-2 md:gap-3">
        <div class="flex flex-col md:flex-row gap-2 md:gap-3">
          
          <v-btn
            v-if="githubLink"
            variant="elevated"
            size="small"
            class="w-full md:flex-1 border rounded-lg !text-sm !py-5 content-center !bg-black !border-gray-500 text-white"
            :href="githubLink.url"
            target="_blank"
            prepend-icon="mdi-github"
          >
            {{ githubLink.title }}
          </v-btn>
          
          
          <v-btn
            v-if="demoLink"
            variant="elevated"
            size="small"
            class="w-full md:flex-1 rounded-lg !text-sm !py-5 content-center !bg-blue-950 text-white"
            :href="demoLink.url"
            target="_blank"
            prepend-icon="mdi-open-in-new"
          >
            {{ demoLink.title }}
          </v-btn>
        </div>

        
        <div v-if="additionalLinks.length" class="flex flex-col gap-2">
          <v-btn
            v-for="link in additionalLinks"
            :key="link.url"
            variant="elevated"
            size="small"
            class="w-full rounded-lg border !py-5 content-center !bg-black !border-gray-500 text-white"
            :href="link.url"
            target="_blank"
            prepend-icon="mdi-open-in-new"
          >
            {{ link.title }}
          </v-btn>
        </div>
      </div>
    </div>
  </v-card>

  <v-dialog v-model="showImageModal" max-width="90vw" max-height="90vh">
    <v-card class="bg-black">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ currentImage?.display_name || currentImage?.name || 'Image' }}</span>
        <v-btn icon="mdi-close" variant="text" @click="showImageModal = false"></v-btn>
      </v-card-title>
      <v-card-text class="pa-0">
        <div class="d-flex justify-center align-center" style="min-height: 60vh;">
          <img 
            :src="currentImageUrl" 
            :alt="currentImage?.display_name || currentImage?.name || 'Image'"
            class="max-w-full max-h-full object-contain"
            style="max-height: 70vh;"
          />
        </div>
      </v-card-text>
      <v-card-actions class="pa-4">
        <v-spacer></v-spacer>
        <!-- <v-btn 
          variant="outlined" 
          prepend-icon="mdi-download"
          @click="downloadImage"
        >
          Download
        </v-btn> -->
        <v-btn 
          variant="outlined" 
          prepend-icon="mdi-open-in-new"
          @click="openImageInNewTab"
        >
          Open in New Tab
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Project } from '../types';
import { 
  getLinkIcon, 
  getLinkIconColor, 
  getStatusColor, 
  getStatusName, 
  getCategoryName, 
  formatDate, 
  formatDateTime, 
  getFileUrl,
  getFileIcon,
  getFileColor
} from '../lib/projectUtils';


interface Props {
  project: Project;
  categories?: Array<{ name: string; key: string }>;
  statuses?: Array<{ name: string; key: string }>;
  showMetaInfo?: boolean;
  previewSettings?: {
    showDescription?: boolean;
    showCategory?: boolean;
    showStatus?: boolean;
    showDates?: boolean;
    showTags?: boolean;
    showTechnologies?: boolean;
    showLinks?: boolean;
    showAssets?: boolean;
  } | null;
}

const props = withDefaults(defineProps<Props>(), {
  showMetaInfo: false,
  previewSettings: () => ({
    showDescription: true,
    showCategory: true,
    showStatus: true,
    showDates: true,
    showTags: true,
    showTechnologies: true,
    showLinks: true,
    showAssets: true,
  })
});


const currentIndex = ref(0);


const showImageModal = ref(false);
const currentImage = ref<any>(null);
const currentImageUrl = ref('');


const openImageModal = (file: any, index: number) => {
  currentImage.value = file;
  currentImageUrl.value = getFileUrlForPreview(file);
  showImageModal.value = true;
};

const downloadImage = () => {
  if (currentImage.value) {
    const link = document.createElement('a');
    link.href = currentImageUrl.value;
    link.download = currentImage.value.display_name || currentImage.value.name || 'image';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const openImageInNewTab = () => {
  if (currentImageUrl.value) {
    window.open(currentImageUrl.value, '_blank');
  }
};


const effectivePreviewSettings = computed(() => {
  return props.previewSettings || {
    showDescription: true,
    showCategory: true,
    showStatus: true,
    showDates: true,
    showTags: true,
    showTechnologies: true,
    showLinks: true,
    showAssets: true,
  };
});


const getFileNameFromUrl = (url: string): string => {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop();
    return filename || url;
  } catch {
    return url;
  }
};


const getFileUrlForPreview = (file: any): string => {
  
  if (file.file && file.file instanceof File) {
    return URL.createObjectURL(file.file);
  }
  
  return getFileUrl(file);
};


const mediaAssets = computed(() => {
  if (!props.project.assets) return [];
  return props.project.assets.filter(file => {
    
    const assetType = file.asset_type?.key || '';
    const filename = file.filename || file.display_name || file.name || file.path || file.url || '';
    const isImage = assetType === 'images' || filename.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff)$/i);
    const isVideo = assetType === 'videos' || filename.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv|m4v)$/i);
    return isImage || isVideo;
  });
});


const documentAssets = computed(() => {
  if (!props.project.assets) return [];
  return props.project.assets.filter(file => {
    
    const assetType = file.asset_type?.key || '';
    const filename = file.filename || file.display_name || file.name || file.path || file.url || '';
    const isImage = assetType === 'images' || filename.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff)$/i);
    const isVideo = assetType === 'videos' || filename.match(/\.(mp4|avi|mov|wmv|flv|webm|mkv|m4v)$/i);
    return !isImage && !isVideo; 
  });
});


const githubLink = computed(() => {
  if (!props.project.links) return null;
  return props.project.links.find(link => link.type === 'github');
});

const demoLink = computed(() => {
  if (!props.project.links) return null;
  return props.project.links.find(link => link.type === 'liveurl');
});

const additionalLinks = computed(() => {
  if (!props.project.links) return [];
  return props.project.links.filter(link => 
    link.type !== 'github' && link.type !== 'liveurl'
  );
});


const getStatusNameLocal = (statusKey: string) => {
  return getStatusName(statusKey, props.statuses);
};

const getCategoryNameLocal = (categoryKey: string) => {
  return getCategoryName(categoryKey, props.categories);
};

const openDocument = (document: any) => {
  const url = getFileUrl(document);
  window.open(url, '_blank');
};
</script>

<style scoped>
.project-card {
  box-shadow: none !important;
  transition: all 0.3s ease;
}

.project-card[data-dark="true"]:hover {
  box-shadow: 0 0 40px rgba(25, 33, 152, 0.6) !important;
}

.project-card:hover .project-title {
  color: #193598 !important;
}
</style>