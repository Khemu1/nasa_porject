# Space Launch System 

## Overview
The **Space Launch System** is a full-stack application that manages upcoming space launches and planetary data. It allows users to view, add, and abort launches while maintaining a list of habitable exoplanets using NASA Exoplanet Archive. Additionally, it integrates the SpaceX API to display a list of completed SpaceX launch missions.

## Features
- **Exoplanet Database**: Fetches and filters habitable exoplanets from a dataset.
- **Launch Management**: Users can schedule new launches and abort existing ones.
- **RESTful API**: Provides endpoints for managing space missions.
- **spaceX API**: use spaceX API to fetch launch missions information


## Technologies Used
### **Backend** (Express)
- **Node.js**: Backend runtime.
- **TypeScript**: Strongly typed development.
- **morgan**: logger.
- **csv-parser**: Parses csv files.
- **mongoose**: Database management 
- **pm2**: Process manager  
- **jest**: API tests
- **helmet**: secure headers


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

[**Architecture Diagram**](https://lucid.app/lucidspark/97ce4ce7-746b-4d86-82cf-5d13d6792550/edit?view_items=Lkh4PGVA8Opy&invitationId=inv_22a09738-f482-48c9-b5ff-afec74c02b99)
