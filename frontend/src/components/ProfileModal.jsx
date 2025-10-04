import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FiCamera } from "react-icons/fi";


const Container = styled.div`
  max-width: 820px;
  margin: 60px auto;
  background: #191c23;
  color: #fff;
  border-radius: 26px;
  border: 6px solid transparent;
  border-image: linear-gradient(90deg, #4285f4, #db4437, #f4b400, #0f9d58) 1;
  padding: 54px 48px 40px 48px;
  box-shadow: 0 8px 40px rgba(66, 133, 244, 0.11), 0 6px 16px rgba(0, 0, 0, 0.22);
  @media (max-width: 960px) {
    max-width: 99vw;
    padding: 32px 8px;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 48px;
  align-items: center;
  margin-bottom: 44px;
  flex-wrap: wrap;
  @media(max-width: 700px){
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #2a2d38;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 24px rgba(66, 133, 244, 0.11);
`;

const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 6px solid #4285f4;
  object-fit: cover;
`;

const CameraButton = styled.label`
  position: absolute;
  right: 12px;
  bottom: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #222;
  color: #f4b400;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #fff;
  cursor: pointer;
  font-size: 1.7em;
  transition: background 0.18s, color 0.18s;
  &:hover {
    background: #2056a6;
    color: #fff;
  }
  input {
    display: none;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  min-width: 0;
  gap: 18px;
`;

const Name = styled.input`
  font-size: 2.5rem;
  font-weight: 800;
  color: #e5e9f7;
  background: transparent;
  border: none;
  border-left: 7px solid #4285f4;
  border-radius: 4px;
  letter-spacing: 0.01em;
  padding-left: 20px;
  outline: none;
  width: 100%;
`;

const Occupation = styled.input`
  font-size: 1.38rem;
  font-weight: 600;
  color: #f4b400;
  background: transparent;
  border: none;
  border-left: 7px solid #0f9d58;
  border-radius: 4px;
  letter-spacing: 0.01em;
  padding-left: 20px;
  outline: none;
  width: 100%;
`;

const ProfileFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #b6bdce;
  margin-bottom: 4px;
  font-weight: 500;
  margin-left: 5px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 26px;
  @media(max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 13px 0;
  }
`;

const FieldInput = styled.input`
  background: #23242b;
  color: #f9fafb;
  border: 1.7px solid #4587fc;
  border-radius: 8px;
  font-size: 1.07rem;
  margin-bottom: 10px;
  font-weight: 500;
  width: 95%;
  max-width: 340px;
  padding: 12px 14px;
  transition: border 0.13s;
  &:focus {
    border-color: #f4b400;
    background: #1c232d;
  }
`;

const SaveButton = styled.button`
  background: linear-gradient(90deg, #4285f4, #0f9d58, #f4b400, #db4437);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  padding: 17px;
  font-size: 1.21rem;
  width: 100%;
  margin-top: 32px;
  cursor: pointer;
  transition: filter 0.14s, box-shadow 0.11s;
  box-shadow: 0 7px 28px rgba(66, 133, 244, 0.16);
  &:hover {
    filter: brightness(1.07);
    box-shadow: 0 8px 30px rgba(66, 133, 244, 0.2);
  }
`;

const LogoutBtn = styled.button`
  background: transparent;
  color: #db4437;
  border: 2px solid #db4437;
  font-weight: 600;
  border-radius: 11px;
  padding: 13px;
  width: 100%;
  margin-top: 20px;
  font-size: 1.07rem;
  letter-spacing: 0.045em;
  transition: background 0.13s, color 0.13s;
  &:hover {
    background: #db4437;
    color: #fff;
  }
`;

export default function ProfileModal({ user }) {
  const LS_KEYS = {
    PHOTO: "profile_photo",
    NAME: "profile_name",
    OCCUPATION: "profile_occupation",
    PHONE: "profile_phone",
    EMAIL: "profile_email",
    LC_HANDLE: "profile_leetcode_handle",
    CC_HANDLE: "profile_codechef_handle",
    LC_RANK: "profile_leetcode_rank",
    CC_RANK: "profile_codechef_rating",
  };

  const [photo, setPhoto] = useState(localStorage.getItem(LS_KEYS.PHOTO) || "https://via.placeholder.com/150.png?text=Photo");
  const [name, setName] = useState(localStorage.getItem(LS_KEYS.NAME) || user?.name || "");
  const [occupation, setOccupation] = useState(localStorage.getItem(LS_KEYS.OCCUPATION) || "");
  const [phone, setPhone] = useState(localStorage.getItem(LS_KEYS.PHONE) || user?.phone || "");
  const [email, setEmail] = useState(localStorage.getItem(LS_KEYS.EMAIL) || user?.email || "");
  const [leetcodeHandle, setLeetcodeHandle] = useState(localStorage.getItem(LS_KEYS.LC_HANDLE) || "");
  const [leetcodeRank, setLeetcodeRank] = useState(null);
  const [codechefHandle, setCodechefHandle] = useState(localStorage.getItem(LS_KEYS.CC_HANDLE) || "");
  const [codechefRating, setCodechefRating] = useState(null);

 
  useEffect(() => {
    setPhoto(localStorage.getItem(LS_KEYS.PHOTO) || "https://via.placeholder.com/150.png?text=Photo");
    setName(localStorage.getItem(LS_KEYS.NAME) || user?.name || "");
    setOccupation(localStorage.getItem(LS_KEYS.OCCUPATION) || "");
    setPhone(localStorage.getItem(LS_KEYS.PHONE) || user?.phone || "");
    setEmail(localStorage.getItem(LS_KEYS.EMAIL) || user?.email || "");
    setLeetcodeHandle(localStorage.getItem(LS_KEYS.LC_HANDLE) || "");
    setCodechefHandle(localStorage.getItem(LS_KEYS.CC_HANDLE) || "");
    setLeetcodeRank(parseInt(localStorage.getItem(LS_KEYS.LC_RANK)) || null);
    setCodechefRating(parseInt(localStorage.getItem(LS_KEYS.CC_RANK)) || null);
  }, [user]);

  
 const fetchLeetcodeRating = async (handle) => {
  if (!handle) return;
  try {
    const res = await fetch(`http://localhost:5000/api/leetcode/${handle}`);
    if (!res.ok) {
      console.error("LeetCode API returned an error:", res.status);
      setLeetcodeRank(null);
      return;
    }
    const data = await res.json(); 
    if (!data.error) {
      setLeetcodeRank(data.ranking || null);
      localStorage.setItem(LS_KEYS.LC_RANK, data.ranking || "");
      localStorage.setItem(LS_KEYS.LC_HANDLE, handle);
    }
  } catch (e) {
    console.error("Network or parsing error fetching LeetCode data", e);
    setLeetcodeRank(null);
  }
};

const fetchCodechefRating = async (handle) => {
  if (!handle) return;
  try {
    const res = await fetch(`http://localhost:5000/api/codechef/${handle}`);
    if (!res.ok) {
      console.error("CodeChef API returned an error:", res.status);
      setCodechefRating(null);
      return;
    }
    const data = await res.json();
    if (!data.error) {
      setCodechefRating(data.rating || null);
      localStorage.setItem(LS_KEYS.CC_RANK, data.rating || "");
      localStorage.setItem(LS_KEYS.CC_HANDLE, handle);
    }
  } catch (e) {
    console.error("Network or parsing error fetching CodeChef data", e);
    setCodechefRating(null);
  }
};

  const handleLeetcodeKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchLeetcodeRating(leetcodeHandle.trim());
    }
  };

  const handleCodechefKeyDown = (e) => {
    if (e.key === "Enter") {
      fetchCodechefRating(codechefHandle.trim());
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhoto(url);
      localStorage.setItem(LS_KEYS.PHOTO, url);
    }
  };

  
  const handleSave = () => {
    localStorage.setItem(LS_KEYS.PHOTO, photo);
    localStorage.setItem(LS_KEYS.NAME, name);
    localStorage.setItem(LS_KEYS.OCCUPATION, occupation);
    localStorage.setItem(LS_KEYS.PHONE, phone);
    localStorage.setItem(LS_KEYS.EMAIL, email);
    alert("Changes saved locally!");
  };

  const handleLogout = () => {
    alert("Logging out...");
    Object.values(LS_KEYS).forEach(key => localStorage.removeItem(key));
  };

  return (
    <Container>
      <Row>
        <AvatarWrapper>
          <Avatar src={photo} alt="Profile" />
          <CameraButton>
            <FiCamera />
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </CameraButton>
        </AvatarWrapper>
        <TitleSection>
          <Name
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Occupation
            placeholder="Occupation"
            value={occupation}
            onChange={e => setOccupation(e.target.value)}
          />
        </TitleSection>
      </Row>
      <ProfileFields>
        <Grid>
          <div>
            <Label>LeetCode Handle</Label>
            <FieldInput
              type="text"
              placeholder="LeetCode username"
              value={leetcodeHandle}
              onChange={e => setLeetcodeHandle(e.target.value)}
              onKeyDown={handleLeetcodeKeyDown}
            />
          </div>
          <div>
            <Label>LeetCode Rank</Label>
            <FieldInput type="number" disabled value={leetcodeRank ?? ""} />
          </div>
          <div>
            <Label>CodeChef Handle</Label>
            <FieldInput
              type="text"
              placeholder="CodeChef username"
              value={codechefHandle}
              onChange={e => setCodechefHandle(e.target.value)}
              onKeyDown={handleCodechefKeyDown}
            />
          </div>
          <div>
            <Label>CodeChef Rating</Label>
            <FieldInput type="number" disabled value={codechefRating ?? ""} />
          </div>
        </Grid>
        <Label>Phone Number</Label>
        <FieldInput
          type="tel"
          placeholder="+91 9000000000"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <Label>Email</Label>
        <FieldInput
          type="email"
          placeholder="mail@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={!!user?.email}
        />
      </ProfileFields>
      <SaveButton onClick={handleSave}>Save Changes</SaveButton>
      <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
    </Container>
  );
}
