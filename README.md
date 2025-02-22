# **Bat Templates**

An open-source platform providing professional **batch file templates** for structured folder setups and **project templates** tailored to different use cases and tiers.

### **Overview**

**Bat Templates** is designed to help developers quickly set up well-structured folder systems and project structures. The platform offers two main categories:

1. **Folder Structure Templates**  
   Batch files for various folder structures tailored to frameworks like React, Node.js, and more.

2. **Project Templates**  
   Templates for common project types like portfolios, blogs, e-commerce sites, dashboards, etc., built to streamline project initialization with ready-to-use configurations.

### **Features**

- **Folder Structure Templates**:  
  Templates for organizing folder structures based on project types (Frontend, Backend, Full Stack).
  
- **Project Templates**:  
  Ready-to-use templates for building specific types of applications (e.g., portfolios, e-commerce platforms, blogs).

- **Open Source**:  
  All templates are open source, encouraging contributions from the community to expand and improve the available templates.

- **Customization**:  
  Templates can be cloned or downloaded to fit specific use cases and can be extended as needed.

- **Contribute**:  
  Users can contribute to the repository by submitting new templates or improving existing ones.

---

## **Installation**

### Clone the repository

```bash
git clone https://github.com/your-username/bat-templates.git
cd bat-templates
```

### Install dependencies

```bash
npm install
```

### Run the project

```bash
npm start
```

---

## **Firebase Setup**

To use Firebase with **Bat Templates**, you'll need to set up your own Firebase project and generate API keys.

1. Visit the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Go to the **Project Settings** > **General** > **Your apps** > **Firebase SDK snippet** and select the **Config** option.
4. Copy the Firebase config object from the Firebase Console and add the corresponding keys to the `.env` file.

Once you have your Firebase credentials, copy the `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

### **.env.example**

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

---

## **Running with Docker**

To run **Bat Templates** using Docker, follow these steps:

1. **Build the Docker image**:

   ```bash
   docker-compose up --build
   ```

2. **Start the services**:

   This command will start the project and expose the app at [http://localhost:5173](http://localhost:5173).

   ```bash
   docker-compose up
   ```

### **Environment Variables in Docker**

Make sure you have a `.env` file with your Firebase credentials before running the Docker container. Docker will load these variables automatically.

Alternatively, you can pass the environment variables manually when running the container by using the `--env-file` option:

```bash
docker run --env-file .env -p 5173:5173 battemplates-dev
```

---

## **Contributing**

We welcome contributions to **Bat Templates**! Here's how you can help:

1. Fork the repository.
2. Create a new branch for your changes (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit and push your changes.
5. Submit a pull request.

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## **Contact**

For any questions or feedback, feel free to open an issue or reach out via our [GitHub Discussions](https://github.com/SrisailamKakurala/BatTemplates/discussions).
