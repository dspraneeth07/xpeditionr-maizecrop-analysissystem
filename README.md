# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/a4c4bf1d-6e06-4bfe-b665-9e15680e4401

## Technologies Used

### Core Technologies
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: React Query

### AI/ML Components
- **Image Classification**: HuggingFace Transformers
  - Model: MobileNetV4 (mobilenetv4_conv_small.e2400_r224_in1k)
  - Purpose: Crop disease detection and analysis
  - Implementation: Browser-based inference using WebGPU acceleration
  - Features:
    - Real-time disease classification
    - Confidence scoring
    - Multi-class disease detection
    - Optimized for mobile devices
    - Low-latency inference
    - Support for various crop types

### Computer Vision Pipeline
- **Image Preprocessing**:
  - Resolution standardization (224x224)
  - Color normalization
  - Augmentation techniques for better accuracy
  - WebGPU-accelerated processing
- **Model Architecture**:
  - MobileNetV4 backbone
  - Custom classification head
  - Optimized for edge devices
  - Quantized for browser deployment

### Disease Detection Capabilities
- **Supported Diseases**:
  - Bacterial Leaf Streak
  - Common Rust
  - Gray Leaf Spot
  - Northern Corn Leaf Blight
  - Healthy Plant Detection
- **Analysis Features**:
  - Disease severity assessment
  - Affected area calculation
  - Treatment recommendations
  - Prevention strategies

### Key Libraries
- **Data Fetching**: @tanstack/react-query
- **Icons**: Lucide React
- **UI Components**: 
  - Radix UI primitives
  - Tailwind CSS animations
  - Custom shadcn/ui components
- **PDF Generation**: html2canvas & jspdf
- **Form Handling**: react-hook-form with zod validation
- **ML/AI Libraries**:
  - @huggingface/transformers for model inference
  - WebGPU acceleration support
  - Browser-optimized tensor operations

### Development Tools
- TypeScript for type safety
- ESLint for code quality
- PostCSS for CSS processing
- Tailwind Typography plugin

### Performance Optimizations
- WebGPU acceleration for ML inference
- Lazy loading of ML models
- Efficient memory management
- Browser-based processing
- Optimized image preprocessing
- Caching strategies for faster inference

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/a4c4bf1d-6e06-4bfe-b665-9e15680e4401) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/a4c4bf1d-6e06-4bfe-b665-9e15680e4401) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
