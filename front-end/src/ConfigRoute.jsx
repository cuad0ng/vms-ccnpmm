import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import ProfileUser from '../src/pages/ProfileUser'
import EditProfileUser from '../src/pages/EditProfileUser'
import ListImage from '../src/pages/ListImage'
import ListVideo from "./pages/ListVideo";
function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="user/" element={<ProfileUser/>} />
      <Route path="user/edit" element={<EditProfileUser/>}/>
      <Route path="user/listImage" element={<ListImage/>}/>
      <Route path="user/listVideo" element={<ListVideo/>}/>
    </Routes>
  );
}

export default ConfigRoute;
