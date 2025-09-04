<template>
    <div class="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
      <div class="lg:w-1/2">
        <h3 class="text-xl sm:text-2xl font-semibold mb-3 text-white flex items-center space-x-3">
          <div v-if="icon" class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <v-icon 
              :icon="getIconName(icon)" 
              size="20" 
              color="blue-600"
            />
          </div>
          <span>{{ title }}</span>
        </h3>
        <p class="text-gray-300 mb-4">{{ description }}</p>
        <ul class="space-y-2 text-gray-400">
          <li v-for="(feature, idx) in features" :key="idx" class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
      <div class="lg:w-1/2 w-full max-w-md">
        <div class="border border-gray-700 rounded-lg overflow-hidden shadow-lg">
          
          <div class="bg-gray-900 h-6 flex items-center px-3 space-x-2">
            <span class="w-3 h-3 rounded-full bg-red-500"></span>
            <span class="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span class="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          
          <div class="bg-gray-800 h-64 p-4">
            
            <div v-if="mockupType === 'projects'" class="h-full">
              <div class="flex flex-wrap gap-2 mb-3">
                <div class="bg-blue-600 text-white text-xs px-3 py-1 rounded">+ New Project</div>
                <div class="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded">All Projects</div>
              </div>
              <div class="space-y-2">
                <div class="bg-gray-700 rounded p-3">
                  <div class="bg-gray-600 h-3 w-2/3 rounded mb-2"></div>
                  <div class="bg-gray-600 h-2 w-1/2 rounded mb-2"></div>
                  <div class="flex flex-wrap gap-1">
                    <span class="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded">Vue</span>
                    <span class="bg-green-600/30 text-green-300 text-xs px-2 py-1 rounded">Laravel</span>
                  </div>
                </div>
                <div class="bg-gray-700 rounded p-3">
                  <div class="bg-gray-600 h-3 w-1/2 rounded mb-2"></div>
                  <div class="bg-gray-600 h-2 w-2/3 rounded mb-2"></div>
                  <div class="flex flex-wrap gap-1">
                    <span class="bg-yellow-600/30 text-yellow-300 text-xs px-2 py-1 rounded">React</span>
                    <span class="bg-red-600/30 text-red-300 text-xs px-2 py-1 rounded">Node.js</span>
                  </div>
                </div>
              </div>
            </div>

            
            <div v-else-if="mockupType === 'kanban'" class="h-full">
              <div class="space-y-3">
                
                <div class="bg-gray-700 rounded p-3">
                  <div class="flex items-center space-x-3 mb-2">
                    <div class="bg-gray-600 rounded-full h-8 w-8 flex-shrink-0"></div>
                    <div class="flex-1 min-w-0">
                      <div class="bg-gray-600 h-3 w-full max-w-32 rounded mb-1"></div>
                      <div class="bg-gray-600 h-2 w-full max-w-24 rounded"></div>
                    </div>
                  </div>
                  <div class="bg-gray-600 h-2 w-full rounded mb-2"></div>
                  <div class="flex flex-wrap gap-2">
                    <div class="bg-blue-600/30 text-blue-300 text-xs px-2 py-1 rounded">Resume</div>
                    <div class="bg-gray-600/30 text-gray-300 text-xs px-2 py-1 rounded">GitHub</div>
                  </div>
                </div>
                
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div class="bg-gray-700 rounded p-2">
                    <div class="bg-gray-600 h-12 rounded mb-2"></div>
                    <div class="bg-gray-600 h-3 w-3/4 rounded mb-1"></div>
                    <div class="bg-gray-600 h-2 w-1/2 rounded mb-2"></div>
                    <div class="flex flex-wrap gap-1">
                      <span class="bg-blue-600/30 text-blue-300 text-xs px-1 py-0.5 rounded">Vue</span>
                      <span class="bg-green-600/30 text-green-300 text-xs px-1 py-0.5 rounded">Laravel</span>
                    </div>
                  </div>
                  <div class="bg-gray-700 rounded p-2">
                    <div class="bg-gray-600 h-12 rounded mb-2"></div>
                    <div class="bg-gray-600 h-3 w-2/3 rounded mb-1"></div>
                    <div class="bg-gray-600 h-2 w-1/2 rounded mb-2"></div>
                    <div class="flex flex-wrap gap-1">
                      <span class="bg-yellow-600/30 text-yellow-300 text-xs px-1 py-0.5 rounded">React</span>
                      <span class="bg-red-600/30 text-red-300 text-xs px-1 py-0.5 rounded">Node.js</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div v-else-if="mockupType === 'profile'" class="h-full">
              <div class="space-y-3">
                
                <div class="flex items-center space-x-3 mb-3">
                  <div class="bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
                    <span class="text-gray-300 text-xs font-bold">PB</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="bg-gray-700 h-4 w-full max-w-32 rounded mb-1"></div>
                    <div class="bg-gray-700 h-3 w-full max-w-24 rounded"></div>
                  </div>
                  <div class="bg-blue-600 text-white text-xs px-2 py-1 rounded flex-shrink-0">Edit</div>
                </div>
                
                
                <div class="space-y-2">
                  <div class="bg-gray-700 rounded p-2">
                    <div class="bg-gray-600 h-2 w-1/4 rounded mb-1"></div>
                    <div class="bg-gray-800 h-6 w-full rounded border border-gray-600"></div>
                  </div>
                  <div class="bg-gray-700 rounded p-2">
                    <div class="bg-gray-600 h-2 w-1/3 rounded mb-1"></div>
                    <div class="bg-gray-800 h-6 w-full rounded border border-gray-600"></div>
                  </div>
                  <div class="bg-gray-700 rounded p-2">
                    <div class="bg-gray-600 h-2 w-1/2 rounded mb-1"></div>
                    <div class="bg-gray-800 h-16 w-full rounded border border-gray-600"></div>
                  </div>
                </div>
                
                
                <div class="flex flex-wrap gap-2 pt-2">
                  <div class="bg-blue-600 text-white text-xs px-3 py-1 rounded">Save Changes</div>
                  <div class="bg-gray-600 text-gray-300 text-xs px-3 py-1 rounded">Cancel</div>
                </div>
              </div>
            </div>

            
            <div v-else-if="mockupType === 'theme'" class="h-full p-0 -m-4">
              <div class="bg-gray-800 h-full rounded-lg border border-gray-700 overflow-hidden relative">
                
                <div class="absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-blue-500 z-10 transform -translate-x-px"></div>
                
                
                <div class="absolute left-0 top-0 w-1/2 h-full bg-white overflow-hidden">
                  <div class="p-3 space-y-3 h-full">
                    <div class="bg-blue-200 h-16 rounded-lg"></div>
                    <div class="space-y-1">
                      <div class="bg-blue-200 h-2 w-3/4 rounded"></div>
                      <div class="bg-blue-200 h-2 w-1/2 rounded"></div>
                    </div>
                    <div class="grid grid-cols-1 gap-2">
                      <div class="bg-blue-100 rounded p-2 flex items-center space-x-2">
                        <div class="bg-blue-300 w-3 h-3 rounded-full flex-shrink-0"></div>
                        <div class="space-y-1 flex-1 min-w-0">
                          <div class="bg-blue-200 h-1.5 w-full rounded"></div>
                          <div class="bg-blue-200 h-1.5 w-2/3 rounded"></div>
                        </div>
                      </div>
                      <div class="bg-blue-100 rounded p-2 flex items-center space-x-2">
                        <div class="bg-blue-300 w-3 h-3 rounded-full flex-shrink-0"></div>
                        <div class="space-y-1 flex-1 min-w-0">
                          <div class="bg-blue-200 h-1.5 w-3/4 rounded"></div>
                          <div class="bg-blue-200 h-1.5 w-1/2 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                
                <div class="absolute right-0 top-0 w-1/2 h-full bg-gray-900 overflow-hidden">
                  <div class="p-3 space-y-3 h-full">
                    <div class="bg-gray-700 h-16 rounded-lg"></div>
                    <div class="space-y-1">
                      <div class="bg-gray-600 h-2 w-3/4 rounded"></div>
                      <div class="bg-gray-600 h-2 w-1/2 rounded"></div>
                    </div>
                    <div class="grid grid-cols-1 gap-2">
                      <div class="bg-gray-800 rounded p-2 flex items-center space-x-2">
                        <div class="bg-gray-600 w-3 h-3 rounded-full flex-shrink-0"></div>
                        <div class="space-y-1 flex-1 min-w-0">
                          <div class="bg-gray-600 h-1.5 w-full rounded"></div>
                          <div class="bg-gray-600 h-1.5 w-2/3 rounded"></div>
                        </div>
                      </div>
                      <div class="bg-gray-800 rounded p-2 flex items-center space-x-2">
                        <div class="bg-gray-600 w-3 h-3 rounded-full flex-shrink-0"></div>
                        <div class="space-y-1 flex-1 min-w-0">
                          <div class="bg-gray-600 h-1.5 w-3/4 rounded"></div>
                          <div class="bg-gray-600 h-1.5 w-1/2 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div v-else-if="mockupType === 'url'" class="h-full">
              <div class="space-y-3">
                
                <div class="bg-gray-700 rounded p-3">
                  <div class="bg-gray-600 h-3 w-full rounded mb-2"></div>
                  <div class="flex flex-wrap gap-2 mb-2">
                    <div class="bg-blue-600 text-white text-xs px-2 py-1 rounded">Custom</div>
                    <div class="bg-green-600 text-white text-xs px-2 py-1 rounded">Available</div>
                  </div>
                  <div class="bg-gray-800 h-6 w-full rounded border border-gray-600 flex items-center px-2 overflow-hidden">
                    <span class="text-gray-300 text-xs truncate">yourname.projectsboard.live</span>
                  </div>
                </div>
                
                
                <div class="space-y-2">
                  <div class="bg-gray-700 rounded p-2">
                    <div class="flex items-center justify-between mb-2 gap-2">
                      <div class="bg-gray-600 h-3 w-1/3 rounded flex-shrink-0"></div>
                      <div class="bg-blue-600 text-white text-xs px-2 py-1 rounded flex-shrink-0">Copy Link</div>
                    </div>
                    <div class="bg-gray-800 h-5 w-full rounded border border-gray-600 flex items-center px-2 overflow-hidden">
                      <span class="text-gray-300 text-xs truncate">https://yourname.projectsboard.live</span>
                    </div>
                  </div>
                  
                  <div class="bg-gray-700 rounded p-2">
                    <div class="flex items-center justify-between gap-2">
                      <div class="bg-gray-600 h-3 w-1/4 rounded flex-shrink-0"></div>
                      <div class="flex gap-1 flex-shrink-0">
                        <div class="bg-blue-600 text-white text-xs px-2 py-1 rounded">Edit</div>
                        <div class="bg-green-600 text-white text-xs px-2 py-1 rounded">Share</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div v-else-if="mockupType === 'responsive'" class="h-full flex items-center justify-center gap-6 p-4 bg-gray-800 rounded-lg -m-4">
              
              <div class="flex flex-col border-4 border-gray-700 rounded-2xl overflow-hidden w-32 h-44 bg-black flex-shrink-0">
                
                <div class="bg-gray-900 h-4 flex items-center justify-center">
                  <div class="w-12 h-1 rounded-full bg-gray-600"></div>
                </div>
                
                <div class="bg-gray-800 flex-1 p-3">
                  <div class="bg-blue-600 h-6 w-full rounded mb-2"></div>
                  <div class="bg-gray-600 h-3 w-4/5 rounded mb-1"></div>
                  <div class="bg-gray-600 h-2 w-3/4 rounded mb-1"></div>
                  <div class="bg-gray-600 h-2 w-2/3 rounded mb-2"></div>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="bg-gray-700 h-8 rounded"></div>
                    <div class="bg-gray-700 h-8 rounded"></div>
                  </div>
                </div>
              </div>

              
              <div class="flex flex-col border-4 border-gray-700 rounded-2xl overflow-hidden w-48 h-32 bg-black flex-shrink-0">
                
                <div class="bg-gray-900 h-5 flex items-center px-2 space-x-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                  <span class="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                </div>
                
                <div class="bg-gray-800 flex-1 p-3">
                  <div class="bg-blue-600 h-6 w-full rounded mb-2"></div>
                  <div class="bg-gray-600 h-3 w-4/5 rounded mb-1"></div>
                  <div class="bg-gray-600 h-2 w-3/4 rounded mb-1"></div>
                  <div class="bg-gray-600 h-2 w-2/3 rounded mb-2"></div>
                  <div class="grid grid-cols-3 gap-2">
                    <div class="bg-gray-700 h-6 rounded"></div>
                    <div class="bg-gray-700 h-6 rounded"></div>
                    <div class="bg-gray-700 h-6 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            
            <div v-else class="h-full flex items-center justify-center text-gray-400 font-mono text-sm">
              {{ mockupTypeText }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    title: string;
    description: string;
    features: string[];
    mockupType: string;
    icon?: string;
  }>();
  
  const mockupTypeTextMap: Record<string, string> = {
    projects: 'Projects Mockup',
    kanban: 'Kanban Preview Mockup',
    profile: 'Profile Mockup',
    theme: 'Theme Switch Mockup',
    url: 'Shareable URL Mockup',
    responsive: 'Responsive Layout Mockup',
  };
  
  const mockupTypeText = mockupTypeTextMap[props.mockupType] || 'Mockup';

  const getIconName = (iconType: string): string => {
    const iconMap: Record<string, string> = {
      folder: 'mdi-folder',
      eye: 'mdi-eye',
      user: 'mdi-account',
      palette: 'mdi-palette',
      share: 'mdi-share-variant',
      device: 'mdi-devices'
    };
    return iconMap[iconType] || 'mdi-help-circle';
  };
  </script>