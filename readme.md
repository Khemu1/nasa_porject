# Space Launch System 🚀

## Overview
The **Space Launch System** is a full-stack application that manages upcoming space launches and planetary data. It allows users to view, add, and abort launches while maintaining a list of habitable exoplanets.

## Features
- 🌍 **Exoplanet Database**: Fetches and filters habitable exoplanets from a dataset.
- 🚀 **Launch Management**: Users can schedule new launches and abort existing ones.
- 🔄 **RESTful API**: Provides endpoints for managing space missions.


## Technologies Used
### **Backend** (NestJS & Express)
- **Node.js**: Backend runtime.
- **TypeScript**: Strongly typed development.

### **Frontend** (React)
- **React.js**: Frontend library.
- **React Router**: For client-side navigation.
- **arwes**: UI styling.


## API Endpoints
### **Planets**
- `GET /planets` → Retrieve list of habitable exoplanets.

### **Launches**
- `GET /launches/upcoming` → Fetch upcoming launches.
- `GET /launches/history` → Get past launch data.
- `POST /launches` → Schedule a new launch.
- `DELETE /launches/:id` → Abort a scheduled launch.

