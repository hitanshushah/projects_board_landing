<script setup lang="ts">
import { ref, computed } from 'vue';
import ProjectCard from '../components/ProjectCard.vue';
import DemoNavbar from '../components/DemoNavbar.vue';
import SignInToast from '../components/SignInToast.vue';

interface Project {
  id: number;
  name: string;
  description: string;
  category?: string;
  status?: string;
  is_public: boolean;
  tags?: string[];
  technologies?: string[];
  thumbnail?: string;
  start_date?: string;
  end_date?: string;
  links?: Array<{
    type: string;
    title: string;
    url: string;
  }>;
  assets?: Array<{
    id?: number;
    name?: string;
    display_name?: string;
    filename?: string;
    url?: string;
    asset_type?: {
      key: string;
      name: string;
    };
  }>;
}


const form = ref({
  name: '',
  description: '',
  category: '',
  status: '',
  tags: [] as string[],
  technologies: [] as string[],
  start_date: '',
  end_date: '',
  links: [] as Array<{ title: string; url: string }>,
  assets: [] as any[] // Keep for compatibility but not used for file uploads
});


const newTag = ref('');
const newTechnology = ref('');
const newLinkTitle = ref('');
const newLinkUrl = ref('');


const showSignInToast = ref(false);
const showUploadToast = ref(false);


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


const previewProject = computed((): Project => ({
  id: Date.now(),
  name: form.value.name || 'Untitled Project',
  description: form.value.description || 'No description provided',
  category: form.value.category,
  status: form.value.status,
  is_public: false,
  tags: form.value.tags,
  technologies: form.value.technologies,
  start_date: form.value.start_date,
  end_date: form.value.end_date,
  links: form.value.links.map(link => ({
    type: 'custom',
    title: link.title,
    url: link.url
  })),
  assets: [
    {
      id: 1,
      name: "preview-image-1.jpg",
      display_name: "Project Screenshot 1",
      filename: "preview-image-1.jpg",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      asset_type: {
        key: "images",
        name: "Images"
      }
    },
    {
      id: 2,
      name: "preview-image-2.jpg",
      display_name: "Project Screenshot 2",
      filename: "preview-image-2.jpg",
      url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
      asset_type: {
        key: "images",
        name: "Images"
      }
    }
  ]
}));


const addTag = () => {
  if (newTag.value.trim() && !form.value.tags.includes(newTag.value.trim())) {
    form.value.tags.push(newTag.value.trim());
    newTag.value = '';
  }
};

const removeTag = (index: number) => {
  form.value.tags.splice(index, 1);
};

const addTechnology = () => {
  if (newTechnology.value.trim() && !form.value.technologies.includes(newTechnology.value.trim())) {
    form.value.technologies.push(newTechnology.value.trim());
    newTechnology.value = '';
  }
};

const removeTechnology = (index: number) => {
  form.value.technologies.splice(index, 1);
};

const formatUrl = (url: string): string => {
  let formattedUrl = url.trim();
  

  if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = 'https://' + formattedUrl;
  }
  
  return formattedUrl;
};

const addLink = () => {
  if (newLinkTitle.value.trim() && newLinkUrl.value.trim()) {
    const formattedUrl = formatUrl(newLinkUrl.value);
    
    form.value.links.push({
      title: newLinkTitle.value.trim(),
      url: formattedUrl
    });
    newLinkTitle.value = '';
    newLinkUrl.value = '';
  }
};

const removeLink = (index: number) => {
  form.value.links.splice(index, 1);
};

const createProject = () => {

  const newProject: Project = {
    id: Date.now(),
    name: form.value.name || 'Untitled Project',
    description: form.value.description || 'No description provided',
    category: form.value.category,
    status: form.value.status,
    is_public: false, // Hidden by default
    tags: [...form.value.tags],
    technologies: [...form.value.technologies],
    start_date: form.value.start_date,
    end_date: form.value.end_date,
    links: form.value.links.map(link => ({
      type: 'custom',
      title: link.title,
      url: link.url
    })),
    assets: [
      {
        id: 1,
        name: "preview-image-1.jpg",
        display_name: "Project Screenshot 1",
        filename: "preview-image-1.jpg",
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        asset_type: {
          key: "images",
          name: "Images"
        }
      },
      {
        id: 2,
        name: "preview-image-2.jpg",
        display_name: "Project Screenshot 2",
        filename: "preview-image-2.jpg",
        url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
        asset_type: {
          key: "images",
          name: "Images"
        }
      }
    ]
  };


  const existingProjects = JSON.parse(sessionStorage.getItem('demoProjects') || '[]');
  existingProjects.push(newProject);
  sessionStorage.setItem('demoProjects', JSON.stringify(existingProjects));


  sessionStorage.setItem('newProjectCreated', 'true');


  window.location.href = '/demo';
};

const cancel = () => {

  window.location.href = '/demo'
};

const showSignInToastMessage = () => {
  showSignInToast.value = true;
  setTimeout(() => {
    showSignInToast.value = false;
  }, 3000);
};

// @ts-ignore
const signInUrl = import.meta.env.VITE_SIGN_IN_URL || 'https://example.com/signin';

const goToSignIn = () => {
  window.open(signInUrl, '_blank');
};

const showUploadToastMessage = () => {
  showUploadToast.value = true;
  setTimeout(() => {
    showUploadToast.value = false;
  }, 3000);
};

const resetForm = () => {
  form.value = {
    name: '',
    description: '',
    category: '',
    status: '',
    tags: [],
    technologies: [],
    start_date: '',
    end_date: '',
    links: [],
    assets: []
  };
  newTag.value = '';
  newTechnology.value = '';
  newLinkTitle.value = '';
  newLinkUrl.value = '';
};

const emit = defineEmits<{
  projectCreated: [project: Project];
}>();
</script>

<template>
  <div class="min-h-screen bg-background">
    <DemoNavbar />
    <div style="height: 72px;"></div>
    <v-container class="py-8 !max-w-none !px-8">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-6 md:gap-0 mb-6">
        <div>
          <v-btn
            icon="mdi-arrow-left"
            variant="outlined"
            @click="cancel"
            color="gray"
            class="mb-4"
          ></v-btn>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-300">Create New Project</h1>
          <p class="text-gray-500 mt-2">Fill in the details below to create your new project</p>
        </div>
        <div class="flex flex-col md:flex-row gap-3 md:gap-4 md:justify-end">
          <v-btn
            variant="outlined"
            size="large"
            @click="cancel"
            class="w-full md:w-auto py-3 md:py-0"
          >
            Cancel
          </v-btn>
          
          <v-btn
            color="#17265C"
            size="large"
            class="w-full md:w-auto py-3 md:py-0"
            @click="createProject"
          >
            Create Project
          </v-btn>
        </div>
      </div>

      <v-row>
                 
         <v-col cols="12" lg="7">
           <v-card class="p-6 bg-[#212121] border border-gray-600">
            <h2 class="text-xl font-bold text-white mb-6">Project Details</h2>
            
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.name"
                  label="Project Name"
                  placeholder="Enter project name"
                  variant="outlined"
                  color="white"
                  class="mb-4"
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.category"
                  :items="categories"
                  item-title="name"
                  item-value="key"
                  label="Category"
                  variant="outlined"
                  color="white"
                  class="mb-4"
                />
              </v-col>
            </v-row>

            <v-textarea
              v-model="form.description"
              label="Description"
              placeholder="Describe your project"
              variant="outlined"
              rows="3"
              color="white"
              class="mb-4"
            />

            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="form.start_date"
                  label="Start Date"
                  type="date"
                  variant="outlined"
                  color="white"
                  class="mb-4"
                />
              </v-col>
              
              <v-col cols="12" md="6">
                <v-select
                  v-model="form.status"
                  :items="statuses"
                  item-title="name"
                  item-value="key"
                  label="Status"
                  variant="outlined"
                  color="white"
                  class="mb-4"
                />
              </v-col>
            </v-row>

            
            <div class="mb-4">
              <v-text-field
                v-model="newTag"
                label="Add Tag"
                placeholder="Enter tag and press Enter"
                variant="outlined"
                color="white"
                @keyup.enter="addTag"
                class="mb-2"
              />
              <div class="flex flex-wrap gap-2">
                <v-chip
                  v-for="(tag, index) in form.tags"
                  :key="index"
                  color="primary"
                  closable
                  @click:close="removeTag(index)"
                >
                  {{ tag }}
                </v-chip>
              </div>
            </div>

            
            <div class="mb-4">
              <v-text-field
                v-model="newTechnology"
                label="Add Technology"
                placeholder="Enter technology and press Enter"
                variant="outlined"
                color="white"
                @keyup.enter="addTechnology"
                class="mb-2"
              />
              <div class="flex flex-wrap gap-2">
                <v-chip
                  v-for="(tech, index) in form.technologies"
                  :key="index"
                  color="secondary"
                  closable
                  @click:close="removeTechnology(index)"
                >
                  {{ tech }}
                </v-chip>
              </div>
            </div>

            
            <div class="mb-4">
              <v-row>
                <v-col cols="12" md="5">
                  <v-text-field
                    v-model="newLinkTitle"
                    label="Link Title"
                    placeholder="e.g., GitHub"
                    variant="outlined"
                    color="white"
                    class="mb-2"
                  />
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    v-model="newLinkUrl"
                    label="Link URL"
                    placeholder="example.com or https://example.com"
                    variant="outlined"
                    color="white"
                    class="mb-2"
                    hint="Enter domain with or without https://"
                    persistent-hint
                  />
                </v-col>
                <v-col cols="12" md="2">
                  <v-btn
                    color="#17265C"
                    @click="addLink"
                    :disabled="!newLinkTitle || !newLinkUrl"
                    class="w-full"
                  >
                    Add
                  </v-btn>
                </v-col>
              </v-row>
              <div class="flex flex-wrap gap-2">
                <v-chip
                  v-for="(link, index) in form.links"
                  :key="index"
                  color="info"
                  closable
                  @click:close="removeLink(index)"
                >
                  {{ link.title }}
                </v-chip>
              </div>
            </div>

            
            <div class="mb-6">
              <div
                class="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-700"
                @click="showUploadToastMessage"
              >
                <v-icon size="48" color="gray">mdi-cloud-upload</v-icon>
                <p class="text-white mt-2">Click to upload images</p>
                <p class="text-gray-400 text-sm">Sign in to upload project images</p>
              </div>
            </div>

                         
             <div class="flex gap-4 justify-end">
               <v-btn
                 variant="outlined"
                 @click="resetForm"
               >
                 Reset
               </v-btn>
               <v-btn
                 color="#17265C"
                 @click="createProject"
               >
                 Create Project
               </v-btn>
             </div>
           </v-card>
         </v-col>

         
         <v-col cols="12" lg="5" class="!mt-[-15px]">
           <v-card class="p-6 bg-[#212121] border border-gray-600 h-fit sticky top-4">
             <div class="mb-6">
               <div class="flex items-center mb-4">
                 <h2 class="text-xl font-semibold text-gray-300">Live Preview</h2>
                 <v-btn
                   icon="mdi-cog"
                   variant="text"
                   size="small"
                   color="gray"
                   @click="showSignInToastMessage"
                 ></v-btn>
               </div>
               <div class="text-sm text-gray-500 mb-4">Click the settings icon to personalize your preview. Hidden fields stay saved and help in sorting and managing your projects.</div>
             </div>
             
             <ProjectCard :project="previewProject" />
           </v-card>
         </v-col>
       </v-row>

       
       <SignInToast 
         :show="showSignInToast" 
         @close="showSignInToast = false"
       />

       
       <SignInToast 
         :show="showUploadToast" 
         @close="showUploadToast = false"
       />
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
