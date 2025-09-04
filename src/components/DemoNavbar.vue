<template>
  <v-app-bar 
    app 
    color="grey-darken-4"
    dark
    height="72" 
    class="px-4 transition-colors duration-300"
    elevation="1"
    style="z-index: 1000;"
  >
    <v-app-bar-title class="font-bold text-xl transition-colors duration-300 cursor-pointer text-white" @click="goHome">
      <div class="flex items-center">
        <img 
          src="/images/logos/dark_mode.png" 
          alt="LogoApp" 
          class="w-24 h-12 rounded mr-2 object-cover"
        >
        
        <div class="hidden md:flex items-center gap-4 ml-8">
          <v-btn
            v-if="linkedinLink"
            :href="linkedinLink.url"
            target="_blank"
            icon
            size="xx-large"
            variant="text"
            :title="`Visit ${linkedinLink.title}`"
          >
            <v-icon class="text-gray-300" size="small">mdi-linkedin</v-icon>
          </v-btn>

          <v-btn
            v-if="githubLink"
            :href="githubLink.url"
            target="_blank"
            icon
            size="xx-large"
            variant="text"
            :title="`Visit ${githubLink.title}`"
          >
            <v-icon class="text-gray-300" size="small">mdi-github</v-icon>
          </v-btn>

          
          <v-btn
            v-if="portfolioLink"
            :href="portfolioLink.url"
            target="_blank"
            icon
            size="xx-large"
            variant="text"
            :title="`Visit ${portfolioLink.title}`"
          >
            <v-icon class="text-gray-300" size="small">mdi-web</v-icon>
          </v-btn>
        </div>
        
        
        <div v-if="documents.length > 0" class="hidden md:block">
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
                size="small"
                variant="text"
                class="!text-gray-300 mr-2 ml-2"
                :title="`${documents.length} document${documents.length !== 1 ? 's' : ''} available`"
              >
                <v-badge
                  :content="documents.length"
                  color="gray-300"
                  offset-x="-2"
                  offset-y="-6"
                >
                  <v-icon>mdi-file-document-multiple</v-icon>
                </v-badge>
              </v-btn>
            </template>

          <v-card min-width="280">
            <v-card-title class="text-sm font-medium pb-2">
              Documents ({{ documents.length }})
            </v-card-title>
            <v-divider></v-divider>
            <v-list density="compact" class="py-1">
              <v-list-item
                v-for="document in documents"
                :key="document.id"
                :href="document.url"
                target="_blank"
                :prepend-icon="getDocumentIcon(document.name || '')"
                :title="document.name"
              >
                <template v-slot:append>
                  <v-icon icon="mdi-open-in-new" size="small" class="text-gray-400"></v-icon>
                </template>
              </v-list-item>
            </v-list>
                     </v-card>
         </v-menu>
        </div>

        
          <div class="flex items-center ml-2 hidden md:flex">
            <v-tooltip
              :text="currentProfile?.share_profile ? 'Projects URL is public' : 'Projects URL is private'"
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <div
                  v-bind="props"
                  class="w-3 h-3 rounded-full mr-2 cursor-help"
                  :class="currentProfile?.share_profile ? 'bg-green-500' : 'bg-red-500'"
                ></div>
              </template>
            </v-tooltip>
            <span class="text-gray-300 text-sm">
              {{ currentProfile?.share_profile ? 'Public' : 'Private' }}
            </span>
            <v-tooltip
              :text="currentProfile?.share_profile ? 'Change projects page to private in your profile page' : 'Change projects page to public in your profile page'"
              location="bottom"
            >
              <template v-slot:activator="{ props }">
                <v-icon
                  v-bind="props"
                  icon="mdi-information"
                  size="small"
                  class="text-gray-400 ml-1"
                ></v-icon>
              </template>
            </v-tooltip>
          </div>
         
                  
        <div v-if="currentProfile?.public_url" class="ml-4 hidden md:block">
          <div class="flex items-center gap-2">
            <v-btn-group>
              
              <v-btn
                :href="`https://${currentProfile.public_url}.${domainUrl}`"
                target="_blank"
                size="medium"
                variant="text"
                append-icon="mdi-open-in-new"
                class="!bg-black text-white !border-gray-600 border !text-sm py-2 px-2"
              >
                <span class="mr-2">Public URL</span>
              </v-btn>

            
            <v-menu v-model="editMenuOpen" offset-y @update:model-value="setupEditPublicUrl">
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon
                  size="x-small"
                  variant="text"
                  class="!bg-black text-white !border-gray-600 border !text-sm px-2 text-gray-400 hover:text-gray-600"
                  :title="`Edit public URL`"
                >
                  <v-icon icon="mdi-pencil" size="small"></v-icon>
                </v-btn>
              </template>
              
              <v-card min-width="400" class="pa-4" @click.stop>
                <v-card-title class="text-lg font-semibold pb-2">Edit Public URL</v-card-title>
                <v-card-text class="pa-0 pb-4">
                  <p class="text-sm text-gray-400 mb-4">
                    Update your custom public URL. This will change your unique profile link.
                  </p>
                  <v-form @submit.prevent="updatePublicUrl" @click.stop>
                    <v-text-field
                      v-model="publicUrlInput"
                      label="Custom URL"
                      variant="outlined"
                      :error-messages="urlError"
                      :loading="isLoading"
                      :disabled="isLoading"
                      prepend-inner-icon="mdi-link"
                      :hint="`Your URL will be: ${fullPublicUrl}`"
                      persistent-hint
                      density="compact"
                      @click.stop
                      @input="validatePublicUrl"
                    >
                      <template v-slot:append>
                        <span class="text-gray-400 text-sm">.{{ domainUrl }}</span>
                      </template>
                    </v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions class="pa-0">
                  <v-spacer></v-spacer>
                  <v-btn variant="outlined" @click="closeEditMenu" :disabled="isLoading" size="small" class="px-2">Cancel</v-btn>
                  <v-btn color="success" @click="updatePublicUrl" :loading="isLoading" :disabled="!publicUrlInput.trim()" size="small" variant="tonal">Update URL</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>

            
            <v-btn
              @click="copyPublicUrl"
              icon
              size="x-small"
              variant="text"
              class="!bg-black text-white !border-gray-600 border !text-sm px-2 text-blue-400 hover:text-blue-600"
              :title="`Copy public URL to clipboard`"
            >
              <v-icon icon="mdi-content-copy" size="small"></v-icon>
            </v-btn>

            
            <v-btn
              @click="sharePublicUrl"
              icon
              size="x-small"
              variant="text"
              class="!bg-black text-white !border-gray-600 border !text-sm px-2 text-green-400 hover:text-green-600"
              :title="`Share public URL`"
            >
              <v-icon icon="mdi-share-variant" size="small"></v-icon>
            </v-btn>

            
            <v-menu v-model="deleteMenuOpen" offset-y>
              <template v-slot:activator="{ props }">
                <v-btn
                  v-bind="props"
                  icon
                  size="x-small"
                  variant="text"
                  class="!bg-black text-white !border-gray-600 border !text-sm px-2 text-red-400 hover:text-red-600"
                  :title="`Delete public URL`"
                >
                  <v-icon icon="mdi-delete" size="small"></v-icon>
                </v-btn>
              </template>
              
              <v-card min-width="300" class="pa-4" @click.stop>
                <v-card-title class="text-lg font-semibold pb-2">Delete Public URL</v-card-title>
                <v-card-text class="pa-0 pb-4">
                  <p class="text-sm text-gray-400 mb-4">
                    Are you sure you want to delete your public URL?
                  </p>
                </v-card-text>
                <v-card-actions class="pa-0">
                  <v-spacer></v-spacer>
                  <v-btn variant="outlined" @click="closeDeleteMenu" size="small">Cancel</v-btn>
                  <v-btn color="error" @click="deletePublicUrl" :loading="isDeleting" size="small" variant="tonal">Delete URL</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-btn-group>
          
        </div>

        </div>

        <div v-else  class="hidden md:block">
        <v-menu v-model="createMenuOpen" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              size="medium"
              variant="text"
              append-icon="mdi-chevron-down"
              class="!bg-black text-white !border-gray-600 border rounded-lg !text-sm py-2 px-2 ml-4"
            >
              <span class="mr-2">Create your Domain</span>
            </v-btn>
          </template>
          
          <v-card min-width="400" class="pa-4" @click.stop>
            <v-card-title class="text-lg font-semibold pb-2">Create your Domain</v-card-title>
            <v-card-text class="pa-0 pb-4">
              <p class="text-sm text-gray-400 mb-4">
                Create a custom public URL for your portfolio. This will be your unique profile link.
              </p>
              <v-form @submit.prevent="savePublicUrl" @click.stop>
                <v-text-field
                  v-model="publicUrlInput"
                  label="Custom URL"
                  variant="outlined"
                  :error-messages="urlError"
                  :loading="isLoading"
                  :disabled="isLoading"
                  prepend-inner-icon="mdi-link"
                  :hint="`Your URL will be: ${fullPublicUrl}`"
                  persistent-hint
                  density="compact"
                  @click.stop
                >
                  <template v-slot:append>
                    <span class="text-gray-400 text-sm">.{{ domainUrl }}</span>
                  </template>
                </v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions class="pa-0">
              <v-spacer></v-spacer>
              <v-btn variant="outlined" @click="closeCreateMenu" :disabled="isLoading" size="small" class="px-2">Cancel</v-btn>
              <v-btn color="success" @click="savePublicUrl" :loading="isLoading" :disabled="!publicUrlInput.trim()" size="small" variant="tonal">Create URL</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        </div>
      </div>
    </v-app-bar-title>

    
    <div class="flex items-center">
      
      <ThemeToggle class="mr-4" />

      
       <div class="md:hidden">
      <v-btn
        icon
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden mr-2 text-white"
      >
        <v-icon>{{ mobileMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
      </v-btn>
      </div>

      
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            icon
            v-bind="props"
            class="ml-2"
          >
            <v-avatar size="40" class="bg-gradient-to-br from-purple-400 to-blue-500">
              <v-img
                v-if="profilePhotoUrl"
                :src="profilePhotoUrl"
                cover
                @error="handleImageError"
              />
              <span v-else class="text-white font-semibold text-lg">{{ userInitials }}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card class="mx-auto" min-width="280" max-width="320">
          
          <v-card-text class="pb-2">
            <div class="flex items-center space-x-3">
              <v-avatar size="48" class="bg-gradient-to-br from-purple-400 to-blue-500 mr-3">
                <v-img
                  v-if="profilePhotoUrl"
                  :src="profilePhotoUrl"
                  cover
                  @error="handleImageError"
                />
                <span v-else class="text-white font-semibold text-xl">{{ userInitials }}</span>
              </v-avatar>
              <div>
                <div class="font-semibold text-white">{{ currentProfile?.name || currentUser?.username || 'Demo User' }}</div>
                <div class="text-sm text-gray-400">{{ currentUser?.email || 'demo@example.com' }}</div>
              </div>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <div class="md:hidden bg-black mx-2 rounded-lg">
            <v-list-item v-if="currentProfile?.public_url">
              <template v-slot:prepend>
                <div
                  class="w-3 h-3 rounded-full mr-4"
                  :class="currentProfile?.share_profile ? 'bg-green-500' : 'bg-red-500'"
                ></div>
              </template>
              <v-list-item-title class="text-gray-300">
                {{ currentProfile?.share_profile ? 'Profile is Public' : 'Profile is Private' }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-gray-500">
                Change in profile settings
              </v-list-item-subtitle>
            </v-list-item>
            </div>

          
          <v-list density="compact" class="py-1">
            <v-list-item
              prepend-icon="mdi-account-edit"
              title="Edit Profile"
              @click="editProfile"
            >
              <template v-slot:append>
                <v-icon icon="mdi-chevron-right" size="small" class="text-gray-400"></v-icon>
              </template>
            </v-list-item>
    
            <v-divider class="my-1"></v-divider>

            <v-list-item
              prepend-icon="mdi-login"
              title="Sign In"
              @click="signIn"
              class="hover:bg-blue-50 transition-colors text-white"
            >
              <template v-slot:append>
                <v-icon icon="mdi-chevron-right" size="small" class="text-gray-400"></v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </v-app-bar>

  
  <v-navigation-drawer
    v-model="mobileMenuOpen"
    temporary
    location="right"
    color="grey-darken-4"
    dark
    width="300"
    style="z-index: 1001;"
  >
    <v-list>


             
       <v-list-subheader class="text-gray-300">Social Links</v-list-subheader>
       
       <v-list-item
         v-if="linkedinLink"
         :href="linkedinLink.url"
         target="_blank"
         prepend-icon="mdi-linkedin"
         class="text-blue-400"
       >
         <v-list-item-title>{{ linkedinLink.title }}</v-list-item-title>
       </v-list-item>

       <v-list-item
         v-if="githubLink"
         :href="githubLink.url"
         target="_blank"
         prepend-icon="mdi-github"
         class="text-gray-300"
       >
         <v-list-item-title>{{ githubLink.title }}</v-list-item-title>
       </v-list-item>

       <v-list-item
         v-if="portfolioLink"
         :href="portfolioLink.url"
         target="_blank"
         prepend-icon="mdi-web"
         class="text-orange-400"
       >
         <v-list-item-title>{{ portfolioLink.title }}</v-list-item-title>
       </v-list-item>

       
       <template v-if="documents.length > 0">
         <v-divider></v-divider>
         <v-list-subheader class="text-gray-300">
           Documents ({{ documents.length }})
         </v-list-subheader>
         
         <v-list-item
           v-for="document in documents"
           :key="document.id"
           :href="document.url"
           target="_blank"
           :prepend-icon="getDocumentIcon(document.name || '')"
           class="text-gray-300"
         >
           <v-list-item-title>{{ document.name }}</v-list-item-title>
           <template v-slot:append>
             <v-icon icon="mdi-open-in-new" size="small" class="text-gray-400"></v-icon>
           </template>
         </v-list-item>
       </template>

       
      <v-divider></v-divider>
      <v-list-subheader class="text-gray-300">Public URL</v-list-subheader>
      
      <v-list-item
        v-if="currentProfile?.public_url"
        :href="`https://${currentProfile.public_url}.${domainUrl}`"
        target="_blank"
        prepend-icon="mdi-link"
        class="text-green-400"
      >
        <v-list-item-title>Visit</v-list-item-title>
        <template v-slot:append>
          <v-icon icon="mdi-open-in-new" size="small" class="text-gray-400"></v-icon>
        </template>
      </v-list-item>

      <v-list-item
        v-if="currentProfile?.public_url"
        @click="setupEditPublicUrl(); editMenuOpen = true"
        prepend-icon="mdi-pencil"
        class="text-blue-400"
      >
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-if="currentProfile?.public_url"
        @click="copyPublicUrl"
        prepend-icon="mdi-content-copy"
        class="text-blue-400"
      >
        <v-list-item-title>Copy</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-if="currentProfile?.public_url"
        @click="sharePublicUrl"
        prepend-icon="mdi-share-variant"
        class="text-green-400"
      >
        <v-list-item-title>Share</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-if="currentProfile?.public_url"
        @click="deleteMenuOpen = true"
        prepend-icon="mdi-delete"
        class="text-red-600"
      >
        <v-list-item-title>Delete</v-list-item-title>
      </v-list-item>

      <v-list-item
        v-else
        @click="createMenuOpen = true"
        prepend-icon="mdi-plus"
        class="text-green-400"
      >
        <v-list-item-title>Create your Domain</v-list-item-title>
      </v-list-item>

      

    </v-list>
  </v-navigation-drawer>

  
  
  
  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    :color="snackbarColor"
    location="bottom"
    multi-line
  >
    {{ snackbarMessage }}
  </v-snackbar>

  
  <SignInToast 
    :show="showSignInToast" 
    @close="showSignInToast = false"
  />
</template>

<script setup lang="ts">
import { computed, ref, Transition } from 'vue';
import ThemeToggle from './ThemeToggle.vue';
import SignInToast from './SignInToast.vue';



const domainUrl = 'projectsboard.live';

const publicUrlInput = ref('');
const urlError = ref('');
const isLoading = ref(false);
const isDeleting = ref(false);
const editMenuOpen = ref(false);
const deleteMenuOpen = ref(false);
const createMenuOpen = ref(false);
const mobileMenuOpen = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('success');
const showSignInToast = ref(false);


const currentProfile = ref({
  name: 'Demo User',
  email: 'demo@example.com',
  share_profile: false, // Set to false to show private status
  public_url: null, // Set to null to show "Create your Domain"
  profile_photo_url: null,
  links: [
    {
      type: 'linkedin',
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/demo-user'
    },
    {
      type: 'github',
      title: 'GitHub',
      url: 'https://github.com/demo-user'
    },
    {
      type: 'portfolio',
      title: 'Portfolio',
      url: 'https://demo-user.dev'
    }
  ],
  documents: [
    {
      id: 1,
      name: 'Resume.pdf',
      url: 'https://example.com/resume.pdf'
    },
    {
      id: 2,
      name: 'Cover Letter.pdf',
      url: 'https://example.com/cover-letter.pdf'
    }
  ]
});

const currentUser = ref({
  username: 'Demo User',
  email: 'demo@example.com'
});

const profilePhotoUrl = computed(() => {
  return currentProfile.value?.profile_photo_url || null;
});

const linkedinLink = computed(() => {
  return currentProfile.value?.links?.find(link => 
    link.type === 'linkedin' || link.title.toLowerCase().includes('linkedin')
  );
});

const githubLink = computed(() => {
  return currentProfile.value?.links?.find(link => 
    link.type === 'github' || link.title.toLowerCase().includes('github')
  );
});

const portfolioLink = computed(() => {
  return currentProfile.value?.links?.find(link => 
    link.type === 'portfolio' || link.title.toLowerCase().includes('portfolio') || link.title.toLowerCase().includes('website')
  );
});

const documents = computed(() => {
  return currentProfile.value?.documents || [];
});

const userInitials = computed(() => {
  const name = currentProfile.value?.name || currentUser.value?.username;
  if (!name) return 'DU';
  return name
    .split(' ')
    .map((name: string) => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
});

const goHome = () => {
  window.location.href = '/';
};

const handleImageError = (error: any) => {
  // Handle image error silently
};

const getDocumentIcon = (documentName: string): string => {
  const name = documentName.toLowerCase();
  if (name.includes('resume') || name.includes('cv')) {
    return 'mdi-file-document-edit';
  } else if (name.includes('cover') || name.includes('letter')) {
    return 'mdi-file-document-outline';
  } else if (name.includes('certificate') || name.includes('cert')) {
    return 'mdi-certificate';
  } else if (name.includes('portfolio')) {
    return 'mdi-briefcase';
  } else {
    return 'mdi-file-document';
  }
};

// @ts-ignore
const signInUrl = import.meta.env.VITE_SIGN_IN_URL || 'https://example.com/signin';

const showSignInToastMessage = () => {
  showSignInToast.value = true;
  setTimeout(() => {
    showSignInToast.value = false;
  }, 5000);
};

const goToSignIn = () => {
  window.open(signInUrl, '_blank');
};

const editProfile = () => {
  showSignInToastMessage();
};

const signIn = () => {
  goToSignIn();
};

const fullPublicUrl = computed(() => {
  if (!publicUrlInput.value.trim()) return '';
  return `${publicUrlInput.value.trim()}.${domainUrl}`;
});

const setupPublicUrl = () => {
  publicUrlInput.value = '';
  urlError.value = '';
};

const setupEditPublicUrl = () => {
  publicUrlInput.value = currentProfile.value?.public_url || '';
  urlError.value = '';
};

const savePublicUrl = async () => {
  showSignInToastMessage();
  closeCreateMenu();
};

const updatePublicUrl = async () => {
  showSignInToastMessage();
  closeEditMenu();
};

const closeEditMenu = () => {
  editMenuOpen.value = false;
};

const validatePublicUrl = () => {
  if (!publicUrlInput.value.trim()) {
    urlError.value = '';
    return;
  }

  if (publicUrlInput.value.includes('.')) {
    urlError.value = 'Public URL cannot contain dots (.). Use only letters, numbers, hyphens, and underscores.';
    return;
  }

  if (!/^[a-zA-Z0-9_-]+$/.test(publicUrlInput.value.trim())) {
    urlError.value = 'Public URL can only contain letters, numbers, hyphens, and underscores.';
    return;
  }

  urlError.value = '';
};

const closeDeleteMenu = () => {
  deleteMenuOpen.value = false;
};

const closeCreateMenu = () => {
  createMenuOpen.value = false;
};

const deletePublicUrl = async () => {
  showSignInToastMessage();
  closeDeleteMenu();
};

const copyPublicUrl = async () => {
  const fullUrl = `https://${currentProfile.value?.public_url}.${domainUrl}`;
  
  try {
    await navigator.clipboard.writeText(fullUrl);
    snackbarMessage.value = 'URL copied to clipboard!';
    snackbarColor.value = 'success';
    snackbar.value = true;
  } catch (error) {
    console.error('Failed to copy URL to clipboard:', error);
    
    const textArea = document.createElement('textarea');
    textArea.value = fullUrl;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    snackbarMessage.value = 'URL copied to clipboard!';
    snackbarColor.value = 'success';
    snackbar.value = true;
  }
};

const sharePublicUrl = async () => {
  const fullUrl = `https://${currentProfile.value?.public_url}.${domainUrl}`;
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${currentProfile.value?.name || 'My Portfolio'}`,
        text: `Check out my portfolio: ${currentProfile.value?.name || 'My Portfolio'}`,
        url: fullUrl
      });
    } catch (error) {
      snackbarMessage.value = 'Share functionality is not supported in this browser. Please copy the URL manually.';
      snackbarColor.value = 'warning';
      snackbar.value = true;
    }
  } else {
    snackbarMessage.value = 'Share functionality is not supported in this browser. Please copy the URL manually.';
    snackbarColor.value = 'warning';
    snackbar.value = true;
  }
};
</script>
