@echo off

mkdir __mocks__
mkdir __setup__
mkdir components\buttons
mkdir components\inputs
mkdir components\modals
mkdir components\search
mkdir components\sidebar
mkdir components\tabs
mkdir hooks
mkdir hooks\ui
mkdir services\aws
mkdir services\firebase
mkdir services\firebase\authServices
mkdir services\firebase\bookmarkServices
mkdir services\firebase\contributorServices
mkdir services\firebase\folderServices
mkdir services\firebase\templateServices
mkdir services\firebase\userServices
mkdir store
mkdir utils

echo // Mock AWS services > __mocks__\awsMock.ts
echo // Mock Firebase services > __mocks__\firebaseMock.ts
echo // Mock localStorage > __mocks__\localStorageMock.ts
echo // Setup tests > __setup__\setupTests.ts
echo // Test utilities > __setup__\testUtils.ts
echo // Button component test > components\buttons\Button.test.tsx
echo // Input component test > components\inputs\Input.test.tsx
echo // Delete modal test > components\modals\DeleteModal.test.tsx
echo // Flag modal test > components\modals\FlagModal.test.tsx
echo // Image modal test > components\modals\ImageModal.test.tsx
echo // Markdown modal test > components\modals\MarkdownModal.test.tsx
echo // Search component test > components\search\Search.test.tsx
echo // Admin Sidebar test > components\sidebar\AdminSidebar.test.tsx
echo // Sidebar test > components\sidebar\Sidebar.test.tsx
echo // Button Tabs test > components\tabs\ButtonTabs.test.tsx
echo // Text Tabs test > components\tabs\TextTabs.test.tsx
echo // useEmailAuth hook test > hooks\useEmailAuth.test.ts
echo // useGoogleAuth hook test > hooks\useGoogleAuth.test.ts
echo // useToast hook test > hooks\ui\useToast.test.ts
echo // AWS upload files test > services\aws\uploadFilesToS3.service.test.ts
echo // AWS upload test > services\aws\uploadToS3.service.test.ts
echo // Google auth service test > services\firebase\authServices\googleAuth.service.test.ts
echo // Fetch bookmarks test > services\firebase\bookmarkServices\fetchBookmarks.service.test.ts
echo // Contributor service test > services\firebase\contributorServices\contributor.service.test.ts
echo // Fetch folders test > services\firebase\folderServices\fetchFolders.service.test.ts
echo // Like service test > services\firebase\folderServices\like.service.test.ts
echo // Upload folders test > services\firebase\folderServices\uploadFolders.service.test.ts
echo // Fetch templates test > services\firebase\templateServices\fetchTemplates.service.test.ts
echo // Submit template test > services\firebase\templateServices\submitTemplate.service.test.ts
echo // Update template test > services\firebase\templateServices\updateTemplate.service.test.ts
echo // View handler test > services\firebase\templateServices\viewHandler.service.test.ts
echo // Update profile service test > services\firebase\userServices\updateProfile.service.test.ts
echo // User service test > services\firebase\userServices\user.service.test.ts
echo // Auth store test > store\authStore.test.ts
echo // Modal store test > store\modalStore.test.ts
echo // Template store test > store\templateStore.test.ts
echo // User store test > store\userStore.test.ts
echo // Utils store test > store\utilsStore.test.ts
echo // Format date util test > utils\formatDate.test.ts
echo // Local storage util test > utils\localStorageUtil.test.ts
echo // Vite environment declaration > vite-env.d.ts

echo Test directory and files have been set up successfully.
