<script setup lang="ts">
import { ref, computed } from "vue"
import ProjectCard from "../components/ProjectCard.vue"
import SearchFilters from "../components/SearchFilters.vue"
import DemoNavbar from "../components/DemoNavbar.vue"
import SignInToast from "../components/SignInToast.vue"

interface Project {
  id: number
  name: string
  description: string
  category?: string
  status?: string
  is_public: boolean
  tags?: string[]
  technologies?: string[]
  thumbnail?: string
  start_date?: string
  end_date?: string
  links?: Array<{
    type: string
    title: string
    url: string
  }>
  assets?: Array<{
    id?: number
    name?: string
    display_name?: string
    filename?: string
    url?: string
    asset_type?: {
      key: string
      name: string
    }
  }>
}


const categories = computed(() => {
  const currentProjects = selectedView.value === 'public' ? publicProjects.value : privateProjects.value
  const allCategories = currentProjects.map(p => p.category).filter(Boolean) as string[]
  const uniqueCategories = [...new Set(allCategories)]
  return uniqueCategories.map(cat => ({ 
    name: cat === 'web' ? 'Web App' : cat === 'mobile' ? 'Mobile' : cat, 
    key: cat 
  }))
})

const statuses = computed(() => {
  const currentProjects = selectedView.value === 'public' ? publicProjects.value : privateProjects.value
  const allStatuses = currentProjects.map(p => p.status).filter(Boolean) as string[]
  const uniqueStatuses = [...new Set(allStatuses)]
  return uniqueStatuses.map(status => ({ 
    name: status === 'progress' ? 'In Progress' : status === 'done' ? 'Completed' : status, 
    key: status 
  }))
})

const technologies = computed(() => {
  const currentProjects = selectedView.value === 'public' ? publicProjects.value : privateProjects.value
  const allTechnologies = currentProjects
    .flatMap(p => p.technologies || [])
    .filter(Boolean)
  return [...new Set(allTechnologies)]
})


const projects = ref<Project[]>([]);


const initializeProjects = () => {

  const defaultProjects = [
      {
        id: 1,
        name: "AI Dashboard",
        description: "Monitor ML experiments with charts & logs.",
        category: "AI",
        status: "progress",
        is_public: false,
        tags: ["AI", "ML"],
        technologies: ["Python", "Postgres", "Tailwind"],
        thumbnail: "https://placehold.co/600x400?text=AI+Dashboard",
        start_date: "2025-01-01",
        links: [
          {
            type: "github",
            title: "View Code",
            url: "https://github.com/example/ai-dashboard"
          },
          {
            type: "liveurl",
            title: "Live Demo",
            url: "https://ai-dashboard-demo.vercel.app"
          },
          {
            type: "documentation",
            title: "Documentation",
            url: "https://docs.ai-dashboard.com"
          }
        ],
        assets: [
          {
            id: 1,
            name: "dashboard1.png",
            display_name: "Dashboard Overview",
            filename: "dashboard1.png",
            url: "/images/dummy-projects/dashboard/dashboard1.png",
            asset_type: {
              key: "images",
              name: "Images"
            }
          },
          {
            id: 2,
            name: "dashboard2.png",
            display_name: "Analytics Charts",
            filename: "dashboard2.png",
            url: "/images/dummy-projects/dashboard/dashboard2.png",
            asset_type: {
              key: "images",
              name: "Images"
            }
          },
          {
            id: 3,
            name: "dasboard3.png",
            display_name: "Mobile View",
            filename: "dasboard3.png",
            url: "/images/dummy-projects/dashboard/dasboard3.png",
            asset_type: {
              key: "images",
              name: "Images"
            }
          }
        ]
      },
  {
    id: 2,
    name: "E-commerce Store",
    description: "Full-stack store with cart & checkout.",
    category: "web",
    status: "done",
    is_public: true,
    tags: ["E-commerce", "Stripe"],
    technologies: ["Vue", "Nuxt", "MongoDB"],
    thumbnail: "https://placehold.co/600x400?text=Ecommerce",
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
        filename: "ecommerce-home.png",
        url: "images/dummy-projects/ecommerce/ecommerce1.png",
        asset_type: {
          key: "images",
          name: "Images"
        }
      },
      {
        id: 5,
        name: "ecommerce-product.png",
        display_name: "Product Page",
        filename: "ecommerce-product.png",
        url: "images/dummy-projects/ecommerce/ecommerce2.png",
        asset_type: {
          key: "images",
          name: "Images"
        }
      },
      {
        id: 6,
        name: "ecommerce-cart.png",
        display_name: "Shopping Cart",
        filename: "ecommerce-cart.png",
        url: "images/dummy-projects/ecommerce/ecommerce3.png",
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
    thumbnail: "https://placehold.co/600x400?text=Task+Manager",
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
      },
      {
        type: "playstore",
        title: "Google Play",
        url: "https://play.google.com/store/apps/details?id=com.taskmanager"
      }
    ],
    assets: [
      {
        id: 7,
        name: "task-list.png",
        display_name: "Task List",
        filename: "task-list.png",
        url: "images/dummy-projects/task/task1.png",
        asset_type: {
          key: "images",
          name: "Images"
        }
      },
      {
        id: 8,
        name: "task-detail.png",
        display_name: "Task Detail",
        filename: "task-detail.png",
        url: "images/dummy-projects/task/task2.png",
        asset_type: {
          key: "images",
          name: "Images"
        }
      },
      {
        id: 9,
        name: "task-calendar.png",
        display_name: "Calendar View",
        filename: "task-calendar.png",
        url: "images/dummy-projects/task/task3.png",
        asset_type: {
          key: "images",
          name: "Images"
        }
      }
    ]
  },
  {
    id: 4,
    name: "Portfolio Website",
    description: "Personal portfolio with dark mode and animations.",
    category: "web",
    status: "progress",
    is_public: false,
    tags: ["Portfolio", "Design"],
    technologies: ["React", "Tailwind", "TypeScript"],
    thumbnail: "https://placehold.co/600x400?text=Portfolio",
    start_date: "2025-01-15",
    links: [
      {
        type: "github",
        title: "View Code",
        url: "https://github.com/example/portfolio"
      }
    ],
    assets: [
      {
        id: 10,
        name: "portfolio-home.png",
        display_name: "Portfolio Home",
        filename: "portfolio-home.png",
        url: "images/dummy-projects/portfolio/portfolio1.png",
        asset_type: {
          key: "images",
          name: "Images"
        }
      },
      {
        id: 11,
        name: "portfolio-projects.png",
        display_name: "Projects Section",
        filename: "portfolio-projects.png",
        url: "images/dummy-projects/portfolio/portfolio2.png",
        asset_type: {
          key: "images",
          name: "Images"
        }
      }
    ]
  }
  ];


  const storedProjects = sessionStorage.getItem('demoProjects');
  let storedProjectsArray: any[] = [];
  
  if (storedProjects) {
    storedProjectsArray = JSON.parse(storedProjects);
  }


  if (storedProjectsArray.length === 0) {
    sessionStorage.setItem('demoProjects', JSON.stringify(defaultProjects));
    projects.value = defaultProjects;
  } else {

    projects.value = storedProjectsArray;
  }
};


initializeProjects();


const selectedView = ref<"hidden" | "public">("hidden")


const showConfirmationModal = ref(false)
const projectToToggle = ref<Project | null>(null)
const toggleAction = ref<'public' | 'hidden'>('public')


const showReorderToast = ref(false)
const showSignInToast = ref(false)
const showProjectCreatedToast = ref(false)

// @ts-ignore
const signInUrl = import.meta.env.VITE_SIGN_IN_URL || 'https://example.com/signin';

const goToSignIn = () => {
  window.open(signInUrl, '_blank');
};


const currentFilters = ref<{
  search: string;
  categories: string[];
  statuses: string[];
  technologies: string[];
  sort_by: string;
  sort_direction: string;
}>({
  search: '',
  categories: [],
  statuses: [],
  technologies: [],
  sort_by: 'created_at',
  sort_direction: 'desc'
})


const publicProjects = computed(() => projects.value.filter(p => p.is_public))
const privateProjects = computed(() => projects.value.filter(p => !p.is_public))


const filteredProjects = computed(() => {
  const baseProjects = selectedView.value === 'public' ? publicProjects.value : privateProjects.value
  
  return baseProjects.filter(project => {

    if (currentFilters.value.search) {
      const searchLower = currentFilters.value.search.toLowerCase()
      const matchesSearch = project.name.toLowerCase().includes(searchLower) ||
                           project.description.toLowerCase().includes(searchLower)
      if (!matchesSearch) return false
    }
    

    if (currentFilters.value.categories.length > 0) {
      if (!project.category || !currentFilters.value.categories.includes(project.category)) {
        return false
      }
    }
    

    if (currentFilters.value.statuses.length > 0) {
      if (!project.status || !currentFilters.value.statuses.includes(project.status)) {
        return false
      }
    }
    

    if (currentFilters.value.technologies.length > 0) {
      const projectTechs = project.technologies || []
      const hasMatchingTech = currentFilters.value.technologies.some(tech => 
        projectTechs.includes(tech)
      )
      if (!hasMatchingTech) return false
    }
    
    return true
  })
})


const createProject = () => {

  window.location.href = '/create'
}

const editProject = (id: number) => {
  showSignInToastMessage()
}

const deleteProject = (id: number) => {
  showSignInToastMessage()
}

const toggleProjectVisibility = (project: Project) => {
  projectToToggle.value = project
  toggleAction.value = project.is_public ? 'hidden' : 'public'
  showConfirmationModal.value = true
}

const confirmToggle = () => {
  if (projectToToggle.value) {
    projectToToggle.value.is_public = !projectToToggle.value.is_public
    

    const storedProjects = sessionStorage.getItem('demoProjects');
    let storedProjectsArray: any[] = [];
    
    if (storedProjects) {
      try {
        storedProjectsArray = JSON.parse(storedProjects);
      } catch (error) {
        console.error('Error parsing stored projects:', error);
        storedProjectsArray = [];
      }
    }
    

    const projectIndex = storedProjectsArray.findIndex((p: any) => p.id === projectToToggle.value?.id);
    if (projectIndex !== -1) {
      storedProjectsArray[projectIndex].is_public = projectToToggle.value.is_public;
    }
    

    sessionStorage.setItem('demoProjects', JSON.stringify(storedProjectsArray));
    

    window.dispatchEvent(new CustomEvent('projectsUpdated'));
  }
  showConfirmationModal.value = false
  projectToToggle.value = null
}

const cancelToggle = () => {
  showConfirmationModal.value = false
  projectToToggle.value = null
}

const openPublicPreview = () => {

  window.open('/public-preview', '_blank')
}

const openReorderModal = () => {
  showReorderToast.value = true
  setTimeout(() => {
    showReorderToast.value = false
  }, 3000)
}

const showSignInToastMessage = () => {
  showSignInToast.value = true
  setTimeout(() => {
    showSignInToast.value = false
  }, 5000)
}

const handleFiltersChanged = (filters: any) => {
  currentFilters.value = filters
}


const checkForNewProject = () => {
  const newProjectFlag = sessionStorage.getItem('newProjectCreated');
  if (newProjectFlag === 'true') {
    showProjectCreatedToast.value = true;
    setTimeout(() => {
      showProjectCreatedToast.value = false;
    }, 3000);
    sessionStorage.removeItem('newProjectCreated');
  }
};


checkForNewProject();
</script>

<template>
  <div class="min-h-screen bg-background">
    <DemoNavbar />
    <div style="height: 72px;"></div>
    <v-container class="p-8 max-w-max">
        <div class="mb-6">
          <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0">
            <h1 class="text-2xl md:text-3xl font-bold text-white">
              Manage Projects
            </h1>
            <div class="flex flex-col md:flex-row gap-3">
              <v-btn
                v-if="publicProjects.length > 0"
                prepend-icon="mdi-open-in-new"
                variant="text"
                @click="openPublicPreview"
                :title="`Preview your ${publicProjects.length} public project${publicProjects.length !== 1 ? 's' : ''}`"
                class="border-2 rounded-lg !text-sm py-3 md:py-2 px-4 content-center text-white !bg-black !border-gray-600"
              >
                Preview Your Domain
                <v-badge
                  :content="publicProjects.length"
                  inline
                  class="ml-2"
                ></v-badge>
              </v-btn>
              <v-btn
                v-else
                prepend-icon="mdi-alert-circle-outline"
                variant="text"
                disabled
                title="Make projects public to preview"
                class="border rounded-lg !text-sm py-3 md:py-2 px-4 content-center text-gray-400 !bg-black !border-gray-600"
              >
                Make projects public to preview
              </v-btn>
              <v-btn
                color="#17265C"
                prepend-icon="mdi-plus"
                @click="createProject"
                class="py-3 md:py-0 content-center"
              >
                Add Project
              </v-btn>
            </div>
          </div>
        </div>

        <SearchFilters
          ref="searchFiltersRef"
          :categories="categories"
          :statuses="statuses"
          :technologies="technologies"
          :current-filters="currentFilters"
          :results-count="filteredProjects.length"
          @filters-changed="handleFiltersChanged"
          class="mb-6"
        />

    
    <div class="flex flex-col md:flex-row gap-2 md:gap-0 mb-6">
      <v-btn
        :color="selectedView === 'hidden' ? '#17265C' : undefined"
        :variant="selectedView === 'hidden' ? 'elevated' : 'outlined'"
        @click="selectedView = 'hidden'"
        prepend-icon="mdi-lock"
        class="w-full md:w-auto"
      >
        Hidden Projects ({{ privateProjects.length }})
      </v-btn>
      <v-btn
        :color="selectedView === 'public' ? '#17265C' : undefined"
        :variant="selectedView === 'public' ? 'elevated' : 'outlined'"
        prepend-icon="mdi-earth"
        @click="selectedView = 'public'"
        class="w-full md:w-auto"
      >
        Public Projects ({{ publicProjects.length }})
      </v-btn>
    </div>

    
    <div v-if="selectedView === 'public' && publicProjects.length > 0" class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <v-btn
          prepend-icon="mdi-drag"
          variant="outlined"
          @click="openReorderModal"
          class="text-sm !bg-black text-white !border-gray-600 border rounded-lg !text-sm py-2 px-4 ml-4"
        >
          Reorder Projects
        </v-btn>
      </div>
      
      
    </div>

    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="relative"
      >
        <ProjectCard :project="project" />
        <div class="absolute top-2 right-2 d-flex gap-1">
          <v-switch
            :model-value="project.is_public"
            @update:model-value="toggleProjectVisibility(project)"
            color="success"
            density="compact"
            hide-details
            class="mr-2"
          >
            <template v-slot:label>
              <span class="text-xs text-white">{{ project.is_public ? 'Public' : 'Hidden' }}</span>
            </template>
          </v-switch>
          <v-btn
            icon="mdi-pencil"
            size="small"
            color="blue"
            variant="tonal"
            @click="editProject(project.id!)"
            title="Edit Project"
          ></v-btn>
          <v-btn
            icon="mdi-delete"
            size="small"
            color="error"
            variant="tonal"
            @click="deleteProject(project.id)"
            title="Delete Project"
          ></v-btn>
        </div>
      </div>
    </div>

    
    <SignInToast 
      :show="showReorderToast" 
      @close="showReorderToast = false"
    />

    
    <SignInToast 
      :show="showSignInToast" 
      @close="showSignInToast = false"
    />

    <v-transition name="slide-fade">
      <div v-if="showProjectCreatedToast" class="fixed top-20 left-1/2 transform -translate-x-1/2 p-4 bg-green-800 border border-green-600 rounded-lg flex items-center justify-between z-[9999] max-w-sm">
        <p class="text-white">Project created successfully! It's now in your hidden projects.</p>
        <v-btn
          icon="mdi-close"
          size="small"
          variant="text"
          color="white"
          @click="showProjectCreatedToast = false"
        ></v-btn>
      </div>
    </v-transition>

    
    <v-dialog v-model="showConfirmationModal" class="!max-w-xl">
      <v-card class="!p-2">
        <v-card-title class="text-h6">
          <v-icon 
            :icon="toggleAction === 'public' ? 'mdi-eye' : 'mdi-eye-off'" 
            :color="toggleAction === 'public' ? 'success' : 'warning'"
            class="mr-2"
          ></v-icon>
          Confirm Project Visibility Change
        </v-card-title>
        <v-card-text>
          <p class="mb-2">
            Are you sure you want to make the project 
            <strong>"{{ projectToToggle?.name }}"</strong> 
            {{ toggleAction === 'public' ? 'public' : 'hidden' }}?
          </p>
          <p class="text-sm text-gray-300">
            {{ toggleAction === 'public' 
              ? 'This project will be visible to everyone.' 
              : 'This project will only be visible to you.' 
            }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            @click="cancelToggle"
          >
            Cancel
          </v-btn>
          <v-btn
            variant="elevated"
            :color="toggleAction === 'public' ? 'success' : 'warning'"
            @click="confirmToggle"
          >
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    </v-container>

    <footer class="bg-black border-t border-gray-800 py-8">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="flex items-center mb-4 md:mb-0">
            <img src="/images/logos/dark_mode.png" alt="ProjectsBoard" class="w-24 h-12 rounded mr-4 object-cover">
            <div class="text-gray-300">
              <p class="font-semibold text-lg">ProjectsBoard</p>
              <p class="text-sm text-gray-400">Showcase your work beautifully</p>
            </div>
          </div>
          <div class="text-center md:text-right">
            <p class="text-gray-400 text-sm">
              © {{ new Date().getFullYear() }} ProjectsBoard. All rights reserved.
            </p>
            <p class="text-gray-500 text-xs mt-1">
              Developed by <a href="https://hitanshushah.projectsboard.live" target="_blank" class="text-blue-400 hover:text-blue-300 cursor-pointer">Hitanshu Shah</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
