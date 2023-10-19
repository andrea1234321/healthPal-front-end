// npm modules
import { Link } from "react-router-dom"

const ProfileCard = ({profile}) => {

return (
  <Link to= {`/chat/${profile._id}/concern`}>
    <h2>{profile.name}</h2>
    <p>Sex assigned at birth: {profile.sex}</p>
    <p>Year of birth: {profile.birthYear}</p>
    <p>Weight: {profile.weight}</p>
    <p>Height: {profile.height}</p>
    <p>Medical History: {profile.medicalHx}</p>
  </Link>
)}

export default ProfileCard