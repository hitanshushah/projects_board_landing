<template>
  <div class="min-h-screen bg-gradient-to-br from-[#0c0c0c] to-[#1A1A1C]">
    
    <div class="px-8 pt-8 pb-4">
      <div class="flex items-center">
        <img 
          src="/images/logos/dark_mode.png" 
          alt="ProjectsBoard" 
          class="w-32 h-12 rounded object-cover"
        >
      </div>
      <div class="w-full h-px bg-gray-800 mt-4"></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div class="max-w-6xl mx-auto">
        
        <div class="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white leading-tight">
            Publish Your Projects. Own Your Domain
          </h1>
          <p class="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            Create modern project portfolios in minutes. Simple, professional, and effective.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto px-4">
            <v-btn
              size="large"
              color="#17265C"
              class="px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto min-h-[48px]"
              @click="goToSignIn"
            >
              Get Started
              <v-icon class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              variant="outlined"
              size="large"
              class="content-center px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto min-h-[48px] border-2 border-gray-600 text-white hover:border-gray-400"
              @click="goToDemo"
            >
              View Demo
            </v-btn>
          </div>
        </div>

        
        <div class="mb-16 sm:mb-20 lg:mb-24 px-4">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-8 sm:mb-12 text-white">
            How it works
          </h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div class="text-center">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span class="text-white font-bold text-lg sm:text-xl">1</span>
              </div>
              <h3 class="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-white">Add Your Projects</h3>
              <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
                Upload images, add descriptions, list the technologies and add links.
              </p>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span class="text-white font-bold text-lg sm:text-xl">2</span>
              </div>
              <h3 class="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-white">Preview & Toggle Visibility</h3>
              <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
                Preview your public page and toggle between private and public domain visibility.
              </p>
            </div>
            <div class="text-center sm:col-span-2 lg:col-span-1">
              <div class="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span class="text-white font-bold text-lg sm:text-xl">3</span>
              </div>
              <h3 class="text-lg sm:text-xl font-medium mb-3 sm:mb-4 text-white">Share & Impress</h3>
              <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
                Create your own domain url to showcase your work to employers and clients.
              </p>
            </div>
          </div>
        </div>

        
        <div class="mb-16 sm:mb-20 lg:mb-24 px-4">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-semibold text-center mb-8 sm:mb-12 lg:mb-16 text-white">
            Everything you need to showcase your work
          </h2>
          
          <div class="space-y-12 sm:space-y-16 lg:space-y-20">
            <FeatureMockup
              title="Add & Manage Projects"
              description="Manage unlimited projects, edit details and hide it as per convenience."
              :features="[
                'Upload project images and documents',
                'Add detailed descriptions and technology tags',
                'Include live demo and GitHub links',
                'Track project status and timeline'
              ]"
              mockup-type="projects"
              icon="folder"
            />

            <FeatureMockup
              title="Preview Your Domain Before Publishing"
              description="See exactly how your project portfolio will look to visitors before making it public."
              :features="[
                'Live preview of public portfolio',
                'Toggle private/public domain visibility',
                'Instant preview updates',
                'Share your resume and profile'
              ]"
              mockup-type="kanban"
              icon="eye"
            />

            <FeatureMockup
              title="Professional Profile"
              description="Create a compelling professional profile that tells your story."
              :features="[
                'Personal bio and professional title',
                'Social media and portfolio links',
                'Upload profile picture',
                'Add resume, cover letter and other documents'
              ]"
              mockup-type="profile"
              icon="user"
            />

            <FeatureMockup
              title="Dual Theme"
              description="Switch seamlessly between dark and light modes."
              :features="[
                'Elegant dark and light themes',
                'Automatic system preference detection',
                'Consistent design across all components',
                'Optimized for accessibility'
              ]"
              mockup-type="theme"
              icon="palette"
            />

            <FeatureMockup
              title="Share Your Work"
              description="Generate a professional, shareable URL for your portfolio."
              :features="[
                'Clean, professional URLs',
                'One-click copy to clipboard',
                'Easy to share over social media',
                'Customized and persnolized domain url'
              ]"
              mockup-type="url"
              icon="share"
            />

            <FeatureMockup
              title="Perfect on Any Device"
              description="Your portfolio looks amazing on desktop, tablet, and mobile."
              :features="[
                'Mobile-first responsive design',
                'Touch-friendly interactions',
                'Optimized loading on all devices',
                'Consistent experience everywhere'
              ]"
              mockup-type="responsive"
              icon="device"
            />
          </div>
        </div>

        
        <div class="text-center px-4 py-8 sm:py-12">
          <h2 class="text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 text-white">
            Ready to showcase your work?
          </h2>
          <p class="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
            Join people transforming their projects into polished portfolios ready to be shared
          </p>
          <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto px-4">
          <v-btn
            size="large"
            color="#17265C"
            class="px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto min-h-[48px]"
            @click="goToSignIn"
          >
            Start Building Now
            <v-icon class="ml-2">mdi-arrow-right</v-icon>
          </v-btn>
          <v-btn
              variant="outlined"
              size="large"
              class="content-center px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto min-h-[48px] border-2 border-gray-600 text-white hover:border-gray-400"
              @click="goToDemo"
            >
              View Demo
            </v-btn>
            </div>
        </div>

        
        <div class="text-center px-4 py-8 sm:py-12 border-t border-gray-700">
          <h2 class="text-lg sm:text-xl lg:text-2xl font-medium mb-4 sm:mb-6 text-white">
            Need Help?
          </h2>
          <p class="text-sm sm:text-base text-gray-300 mb-4 max-w-md mx-auto leading-relaxed">
            For any additional inquiries and support, contact us at:
          </p>
          <a 
            href="mailto:support@projectsboard.live" 
            class="text-blue-400 hover:text-blue-300 text-lg font-medium transition-colors"
          >
            support@projectsboard.live
          </a>
        </div>
      </div>
    </div>

    
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

<script setup lang="ts">
import FeatureMockup from '../components/FeatureMockup.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

function goToSignIn() {
  const signInUrl = (import.meta as any).env.VITE_SIGN_IN_URL;
  if (signInUrl) {
    window.open(signInUrl, '_blank');
  } else {
    router.push('https://admin.projectsboard.live/');
  }
}

function goToDemo() {
  router.push('/demo');
}
</script>

<style scoped>
/* Add smooth fade-in for sections */
div {
  scroll-behavior: smooth;
}
</style>
