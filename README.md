# SoundWave

Welcome to **SoundWave**, a Music platform built using the **MERN Stack**. This application allows you to Upload or Listen Your Favorite Songs. 🎧

SoundWave provides a seamless experience for Listning Your Favorite Songs 🎼❤️

## Features

### 1. **User Authentication** 🔐 
### 2. **Create/Delete Playlist** 📚
### 3. **User Profile Updation** 👤
### 4. **Add/Remove Songs From Playlist**
### 5. **Like/Unlike Songs**
### 6. **Upload/Delete Songs**

---

## Tech Stack 🛠️

### Frontend:
- **React.js**: For building dynamic user interfaces.
- **Tailwind CSS**: For beautiful and Responsive styling.
- **Axios**: For handling HTTP requests.
- **React Router Dom**: For navigating between pages.

### Backend:
- **Node.js** with **Express.js**: For building the server-side application.
- **MongoDB**: For database storage.
- **JWT**: Token-based stateless authentication.
- **Mongoose**: For database schema.
- **Cloudinary** and **Multer**: For storing images in the cloud.
- **Superbase**: Cloud Storage For Uploaded Songs 

---

## Installation 🚀

1. Clone the repository:

```bash
   git clone https://github.com/Code-By-Amit/mern-music-app.git
```
2. Navigate to Client and Backend Folder and Install dependencies:
```
# Client
cd client 
npm install

# Backend
cd backend
npm install
```

3. Set up environment variables
   - in `backend/.env`:
```javascript
PORT=
JWT_SECRET=
MongoDB_URL=

Frontend_URL=
NODE_ENV=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_URL=
SUPABASE_BUCKET_NAME=
```

- in `client/.env`
```javascript
VITE_BACKEND_URL=
VITE_Web3Form_ACCESS_KEY=
``` 

4. Start the development servers:
- Backend 
``` bash
    cd backend
    npm run dev
```
- Frontend
```bash
   cd client
   npm run dev
```

## Contributing 🤝
We welcome contributions! Feel free to fork the repo, create a new branch, and submit a pull request. 

## Thank You
Thank you for checking out SoundWave! I hope you enjoy using and contributing to it! 😄✨

