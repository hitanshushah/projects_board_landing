<script setup lang="ts">
import { ref, computed } from 'vue';
import ProjectCard from '../components/ProjectCard.vue';
import ThemeToggle from '../components/ThemeToggle.vue';
import type { Project } from '../types';


const projects = ref<Project[]>([]);


const initializeProjects = () => {

  const defaultPublicProjects = [
    {
      id: 2,
      name: "E-commerce Store",
      description: "Full-stack store with cart & checkout.",
      category: "web",
      status: "done",
      is_public: true,
      tags: ["E-commerce", "Stripe"],
      technologies: ["Vue", "Nuxt", "Postgres"],
      start_date: "2024-06-01",
      end_date: "2024-12-01",
      links: [
        {
          type: "github",
          title: "View Code",
          url: "https://github.com/example/ecommerce-store"
        },
        {
          type: "liveurl",
          title: "Live Demo",
          url: "https://ecommerce-store-demo.vercel.app"
        }
      ],
      assets: [
        {
          id: 4,
          name: "ecommerce-home.png",
          display_name: "Homepage",
          url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
          asset_type: {
            key: "images",
            name: "Images"
          }
        }
      ]
    },
    {
      id: 3,
      name: "Mobile Task Manager",
      description: "Cross-platform task management app with offline support.",
      category: "mobile",
      status: "done",
      is_public: true,
      tags: ["Mobile", "Offline"],
      technologies: ["React Native", "Firebase", "Redux"],
      start_date: "2024-03-01",
      end_date: "2024-08-01",
      links: [
        {
          type: "github",
          title: "View Code",
          url: "https://github.com/example/task-manager"
        },
        {
          type: "liveurl",
          title: "App Store",
          url: "https://apps.apple.com/app/task-manager"
        }
      ],
      assets: [
        {
          id: 7,
          name: "task-list.png",
          display_name: "Task List",
          url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
          asset_type: {
            key: "images",
            name: "Images"
          }
        }
      ]
    }
  ];


  const storedProjects = sessionStorage.getItem('demoProjects');
  console.log('Raw stored projects:', storedProjects);
  
  let storedProjectsArray: Project[] = [];
  if (storedProjects) {
    try {
      storedProjectsArray = JSON.parse(storedProjects);
      console.log('Parsed stored projects:', storedProjectsArray);
    } catch (error) {
      console.error('Error parsing stored projects:', error);
      storedProjectsArray = [];
    }
  }


  let allProjects: Project[];
  if (storedProjectsArray.length === 0) {

    allProjects = defaultPublicProjects;
  } else {

    allProjects = storedProjectsArray;
  }
  
  console.log('All projects before filtering:', allProjects);
  console.log('Projects with is_public:', allProjects.map(p => ({ id: p.id, name: p.name, is_public: p.is_public, type: typeof p.is_public })));
  

  projects.value = allProjects.filter((project: Project) => {
    console.log(`Project ${project.name}: is_public = ${project.is_public} (${typeof project.is_public})`);
    return project.is_public === true;
  });
  
  console.log('Final filtered public projects:', projects.value);
};


initializeProjects();


window.addEventListener('storage', (event) => {
  if (event.key === 'demoProjects') {
    console.log('Projects updated in sessionStorage, refreshing...');
    initializeProjects();
  }
});


window.addEventListener('projectsUpdated', () => {
  console.log('Projects updated event received, refreshing...');
  initializeProjects();
});


window.addEventListener('focus', () => {
  console.log('Page focused, refreshing projects...');
  initializeProjects();
});

const categories = ref([
  { name: "Web App", key: "web" },
  { name: "Mobile", key: "mobile" },
  { name: "Desktop", key: "desktop" },
  { name: "API", key: "api" }
]);

const statuses = ref([
  { name: "In Progress", key: "progress" },
  { name: "Completed", key: "done" },
  { name: "Planning", key: "planning" },
  { name: "On Hold", key: "hold" }
]);

const technologies = computed(() => {
  const allTechnologies = new Set<string>();
  projects.value.forEach(project => {
    if (project.technologies && Array.isArray(project.technologies)) {
      project.technologies.forEach(tech => allTechnologies.add(tech));
    }
  });
  return Array.from(allTechnologies);
});

const userProfile = ref({
  name: 'Demo User',
  email: 'demo@example.com',
  designation: 'Full Stack Developer',
  bio: 'Passionate developer with expertise in modern web technologies. Building scalable applications and creating meaningful user experiences.',
  city: 'London, ON',
  country: 'Canada',
  profile_photo_url: null,
  links: [
    {
      type: 'linkedin',
      title: 'LinkedIn',
      url: (import.meta as any).env.VITE_LINKEDIN_URL || '/demo'
    },
    {
      type: 'github',
      title: 'GitHub',
      url: (import.meta as any).env.VITE_GITHUB_URL || '/demo'
    },
    {
      type: 'portfolio',
      title: 'Portfolio',
      url: (import.meta as any).env.VITE_WEBSITE_URL || '/demo'
    }
  ],
  documents: [
    {
      id: 1,
      name: 'Resume.pdf',
      display_name: 'Resume',
      url: 'https://example.com/resume.pdf'
    },
    {
      id: 2,
      name: 'Cover Letter.pdf',
      display_name: 'Cover Letter',
      url: 'https://example.com/cover-letter.pdf'
    }
  ]
});

const selectedCategory = ref('all');

const availableCategories = computed(() => {
  const projectCategories = new Set(projects.value.map(project => project.category).filter(Boolean));
  return categories.value.filter(category => projectCategories.has(category.key));
});

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'all') {
    return projects.value;
  }
  return projects.value.filter(project => project.category === selectedCategory.value);
});

const userInitials = computed(() => {
  if (!userProfile.value?.name) return 'DU';
  return userProfile.value.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

const currentYear = new Date().getFullYear();

const handleImageError = () => {

};

const goToDemo = () => {
  window.location.href = '/demo';
};

const uniqueDocuments = computed(() => {
  if (!userProfile.value?.documents) return [];
  
  const seen = new Set();
  return userProfile.value.documents.filter((document: any) => {
    const displayName = document.display_name || '';
    if (seen.has(displayName)) {
      return false;
    }
    seen.add(displayName);
    return true;
  });
});

const getDocumentIcon = (filename: string): string => {
  const lowerFilename = filename.toLowerCase();
  if (lowerFilename.includes('resume') || lowerFilename.includes('cv')) {
    return 'mdi-file-document';
  } else if (lowerFilename.includes('cover') || lowerFilename.includes('letter')) {
    return 'mdi-file-document-outline';
  } else if (lowerFilename.includes('certificate') || lowerFilename.includes('cert')) {
    return 'mdi-certificate';
  } else if (lowerFilename.includes('portfolio')) {
    return 'mdi-briefcase';
  } else {
    return 'mdi-file-document-multiple';
  }
};

const getLinkIcon = (linkType: string): string => {
  const lowerType = linkType.toLowerCase();
  if (lowerType.includes('github')) {
    return 'mdi-github';
  } else if (lowerType.includes('linkedin')) {
    return 'mdi-linkedin';
  } else if (lowerType.includes('portfolio') || lowerType.includes('website')) {
    return 'mdi-web';
  } else if (lowerType.includes('twitter')) {
    return 'mdi-twitter';
  } else {
    return 'mdi-link';
  }
};
</script>

<template>
  <div class="!bg-gradient-to-br from-[#0c0c0c] to-[#1A1A1C]">
    <div class="px-8 pt-8 pb-4">
      <div class="flex flex-row justify-between">
        <div class="flex items-center gap-3 mb-4">
          <img 
            src="/images/logos/dark_mode.png" 
            alt="LogoApp" 
            class="w-32 h-12 rounded mr-2 object-cover"
          >
        </div>
        <div class="flex justify-end mb-4">
          <ThemeToggle class="mr-4" />
        </div>
      </div>
      <div class="w-full h-px bg-gray-800"></div>
    </div>
    
    <section class="bg-black !mx-8 !my-8 rounded-xl">
      <div class="mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div class="hidden md:flex flex-row items-start space-x-8">
          <div class="flex-shrink-0 mr-8 ml-8">
            <div v-if="userProfile?.profile_photo_url" class="w-24 h-24 rounded-full overflow-hidden">
              <v-img
                :src="userProfile.profile_photo_url"
                :alt="userProfile?.name || 'Profile Photo'"
                class="w-full h-full !object-cover bg-gradient-to-br from-black-800 to-black-950"
                @error="handleImageError"
              />
            </div>
            <div v-else class="w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold text-gray-300">
              <span>{{ userInitials }}</span>
            </div>
          </div>
          
          <div class="flex-1">
            <div class="flex flex-row gap-8 justify-between">
              <div>
                <h1 class="text-3xl font-bold text-gray-300 mb-2">
                  {{ userProfile?.name }}
                </h1>
              </div>
              <div v-if="uniqueDocuments.length > 0" class="flex flex-wrap gap-3 items-center">
                <v-btn
                  v-for="document in uniqueDocuments"
                  :key="`${document.id}-${document.display_name}`"
                  variant="elevated"
                  size="small"
                  :href="document.url"
                  target="_blank"
                  class="!bg-black !text-gray-300 !border-gray-800 hover:bg-gray-700 border"
                >
                  <v-icon 
                    :icon="getDocumentIcon(document.display_name || '')" 
                    class="mr-2"
                    color="gray-300"
                  ></v-icon>
                  {{ document.display_name || 'Document' }}
                  <v-icon icon="mdi-download" size="small" class="ml-2"></v-icon>
                </v-btn>
              </div>
            </div>
            <p class="text-xl text-blue-400 mb-4">
              {{ userProfile?.designation }}
            </p>
            <p class="text-gray-400 text-lg mb-6 max-w-3xl">
              {{ userProfile?.bio }}
            </p>
            
            <div class="flex items-center space-x-6 mb-6 gap-8">
              <div v-if="userProfile?.city || userProfile?.country" class="flex items-center text-gray-400">
                <v-icon icon="mdi-map-marker-outline" size="small" variant="outlined" class="mr-2 text-gray-400"></v-icon>
                <span>{{ [userProfile?.city, userProfile?.country].filter(Boolean).join(', ') }}</span>
              </div>
              <div v-if="userProfile?.email" class="flex items-center text-gray-400">
                <v-icon icon="mdi-email-outline" size="small" class="mr-2 text-gray-400"></v-icon>
                <span>{{ userProfile.email }}</span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-3">
              <v-btn
                v-for="link in userProfile?.links || []"
                :key="`${link.title}-${link.url}`"
                variant="outlined"
                size="medium"
                :href="link.url"
                target="_blank"
                class="!bg-black text-gray-300 !border-gray-800 hover:!border-gray-400 hover:!bg-gray-900 transition-all duration-200 px-4 py-2 cursor-pointer"
              >
                <v-icon :icon="getLinkIcon(link.type || link.title)" class="mr-2" size="18"></v-icon>
                <span class="font-medium text-sm">{{ link.title.toUpperCase() }}</span>
              </v-btn>
            </div>
          </div>
        </div>

        <div class="md:hidden flex flex-col items-center">
          <div v-if="uniqueDocuments.length > 0" class="flex flex-wrap gap-3 justify-center w-full">
            <v-btn
              v-for="document in uniqueDocuments"
              :key="`${document.id}-${document.display_name}`"
              variant="elevated"
              size="small"
              :href="document.url"
              target="_blank"
              class="!bg-black !text-gray-300 !border-gray-800 hover:bg-gray-700 border"
            >
              <v-icon 
                :icon="getDocumentIcon(document.display_name || '')" 
                class="mr-2"
                color="gray-300"
              ></v-icon>
              {{ document.display_name || 'Document' }}
              <v-icon icon="mdi-download" size="small" class="ml-2"></v-icon>
            </v-btn>
          </div>

          <div class="flex-shrink-0 mt-4 mb-4">
            <div v-if="userProfile?.profile_photo_url" class="w-32 h-32 rounded-full overflow-hidden">
              <v-img
                :src="userProfile.profile_photo_url"
                :alt="userProfile?.name || 'Profile Photo'"
                class="w-full h-full object-cover bg-gradient-to-br from-blue-800 to-blue-950"
                @error="handleImageError"
              />
            </div>
            <div v-else class="w-32 h-32 bg-primary rounded-full flex items-center justify-center">
              <span class="text-3xl font-bold text-gray-300">{{ userInitials }}</span>
            </div>
          </div>
          
          <div class="flex-1 text-center">
            <h1 class="text-2xl font-bold text-gray-300 mb-2">
              {{ userProfile?.name }}
            </h1>
            <p class="text-lg text-blue-400 mb-4">
              {{ userProfile?.designation }}
            </p>
            <p class="text-gray-400 text-base mb-6">
              {{ userProfile?.bio }}
            </p>
            
            <div class="flex flex-col items-center space-y-3 mb-6">
              <div v-if="userProfile?.city || userProfile?.country" class="flex items-center text-gray-400">
                <v-icon icon="mdi-map-marker-outline" size="small" variant="outlined" class="mr-2 text-gray-400"></v-icon>
                <span>{{ [userProfile?.city, userProfile?.country].filter(Boolean).join(', ') }}</span>
              </div>
              <div v-if="userProfile?.email" class="flex items-center text-gray-400">
                <v-icon icon="mdi-email-outline" size="small" class="mr-2 text-gray-400"></v-icon>
                <span>{{ userProfile.email }}</span>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-3 justify-center">
              <v-btn
                v-for="link in userProfile?.links || []"
                :key="`${link.title}-${link.url}`"
                variant="outlined"
                size="medium"
                :href="link.url"
                target="_blank"
                class="!bg-black text-gray-300 !border-gray-800 hover:!border-gray-400 hover:!bg-gray-900 transition-all duration-200 px-4 py-2"
              >
                <v-icon :icon="getLinkIcon(link.type || link.title)" class="mr-2" size="18"></v-icon>
                <span class="font-medium text-sm">{{ link.title.toUpperCase() }}</span>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </section>

    <main class="md:!mx-8 !mx-0 !my-8">
      <div class="mx-auto px-6 md:py-12 py-2">
        <div class="mb-8">
          <div class="flex flex-wrap gap-3">
            <v-btn
              variant="elevated"
              :class="[
                selectedCategory === 'all'
                  ? '!bg-gradient-to-br !from-blue-950 !to-blue-800 !text-white rounded-lg'
                  : '!bg-black text-gray-300 !border !border-gray-800 rounded-lg'
              ]"
              @click="selectedCategory = 'all'"
            >
              All Projects
            </v-btn>
            <v-btn
              v-for="category in availableCategories"
              :key="category.key"
              variant="elevated"
              :class="[
                selectedCategory === category.key
                  ? '!bg-gradient-to-br !from-blue-950 !to-blue-800 !text-white rounded-lg'
                  : '!bg-black text-gray-300 !border !border-gray-800 rounded-lg'
              ]"
              @click="selectedCategory = category.key"
            >
              {{ category.name }}
            </v-btn>
          </div>
        </div>

        <div v-if="technologies.length > 0" class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6">Technologies Used:</h2>
          <div class="flex flex-wrap gap-3">
            <v-chip
              v-for="tech in technologies"
              :key="tech"
              size="large"
              class="!border-2 !border-blue-900 !bg-[#23153A] !text-blue-400"
            >
              {{ tech }}
            </v-chip>
          </div>
        </div>

        <section v-if="filteredProjects.length > 0" class="projects-section">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="project in filteredProjects" 
              :key="project.id" 
              class="project-item transform transition-all duration-300 hover:scale-105"
            >
              <ProjectCard
                :project="project"
                :categories="categories"
                :statuses="statuses"
                class="h-full"
              />
            </div>
          </div>
        </section>

        <section v-else class="no-projects-section text-center py-20">
          <div class="max-w-md mx-auto">
            <v-icon 
              icon="mdi-folder-open" 
              size="64" 
              color="gray-600" 
              class="mb-6"
            ></v-icon>
            <h3 class="text-2xl font-bold text-gray-300 mb-4">
              {{ selectedCategory === 'all' ? 'No Projects Available' : 'No Projects in This Category' }}
            </h3>
            <p class="text-gray-500 mb-6">
              {{ selectedCategory === 'all' 
                ? 'There are no public projects available at the moment.' 
                : `No projects found in the "${categories.find(c => c.key === selectedCategory)?.name || selectedCategory}" category.` 
              }}
            </p>
            <v-btn
              v-if="selectedCategory !== 'all'"
              variant="outlined"
              color="primary"
              @click="selectedCategory = 'all'"
            >
              View All Projects
            </v-btn>
          </div>
        </section>
      </div>
    </main>

    <footer class="bg-black border-t border-gray-800 py-8">
      <div class="container mx-auto px-6 text-center">
        <p class="text-gray-400">
          © {{ currentYear }} {{ userProfile?.name || 'Portfolio' }}. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
html, body {
  background: linear-gradient(to bottom right, #0c0c0c, #1A1A1C) !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
