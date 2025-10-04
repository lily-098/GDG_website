import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/useAuth";
import { useNavigate } from "react-router-dom";


const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const ProfileBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #000;
  border: 3px solid transparent;
  border-radius: 12px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s ease;
  color: #fff;
  border-image: linear-gradient(
    90deg,
    #4285f4,
    #db4437,
    #f4b400,
    #0f9d58
  ) 1;

  &:hover {
    background: #111;
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  right: 0;
  top: 110%;
  background: #000;
  border-radius: 12px;
  border: 2px solid transparent;
  border-image: linear-gradient(
    90deg,
    #4285f4,
    #db4437,
    #f4b400,
    #0f9d58
  ) 1;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  padding: 10px;
  min-width: 240px;
  z-index: 100;
  color: #fff;
`;

const Option = styled.div`
  padding: 10px 12px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
  color: #fff;

  &:hover {
    background: #222;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #333;
  margin: 6px 0;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
`;

const ModalBox = styled.div`
  background: #000;
  padding: 20px;
  border-radius: 14px;
  width: 90%;
  max-width: 400px;
  border: 3px solid transparent;
  border-image: linear-gradient(
    90deg,
    #4285f4,
    #db4437,
    #f4b400,
    #0f9d58
  ) 1;
  color: #fff;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #444;
  border-radius: 8px;
  background: #111;
  color: #fff;

  &:focus {
    border-color: #4285f4;
  }
`;

const SaveBtn = styled.button`
  background: #4285f4;
  color: white;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: #3367d6;
  }
`;

export default function ProfileButton() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [leetcodeRank, setLeetcodeRank] = useState(null);
  const [codechefRating, setCodechefRating] = useState(null);

  const [showLCModal, setShowLCModal] = useState(false);
  const [showCCModal, setShowCCModal] = useState(false);
  const [lcHandle, setLcHandle] = useState(localStorage.getItem("leetcodeHandle") || "");
  const [ccHandle, setCcHandle] = useState(localStorage.getItem("codechefHandle") || "");

  
  const fetchLeetcode = async (handle) => {
    try {
      const res = await fetch(`http://localhost:5000/api/leetcode/${handle}`);
      const data = await res.json();
      if (!data.error) {
        setLeetcodeRank(data.ranking || null);
      }
    } catch (err) {
      console.error(err);
    }
  };

 
  const fetchCodechef = async (handle) => {
    try {
      const res = await fetch(`http://localhost:5000/api/codechef/${handle}`);
      const data = await res.json();
      if (!data.error) {
        setCodechefRating(data.rating || null);
      }
    } catch (err) {
      console.error(err);
    }
  };

 
  useEffect(() => {
    if (lcHandle) fetchLeetcode(lcHandle);
    if (ccHandle) fetchCodechef(ccHandle);
  }, []);

  const handleSaveLeetcode = () => {
    if (lcHandle.trim() !== "") {
      localStorage.setItem("leetcodeHandle", lcHandle);
      fetchLeetcode(lcHandle);
    }
    setShowLCModal(false);
  };

  const handleSaveCodechef = () => {
    if (ccHandle.trim() !== "") {
      localStorage.setItem("codechefHandle", ccHandle);
      fetchCodechef(ccHandle);
    }
    setShowCCModal(false);
  };

  return (
    <ButtonContainer>
      <ProfileBtn onClick={() => setOpen(!open)}>
        <User size={18} />
        {user?.email || "Profile"}
        <ChevronDown size={16} />
      </ProfileBtn>

      <AnimatePresence>
        {open && (
          <Dropdown
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Option onClick={() => setShowLCModal(true)}>
              <span>LeetCode Rank</span>
              <span>{leetcodeRank !== null ? leetcodeRank : "—"}</span>
            </Option>

            <Option onClick={() => setShowCCModal(true)}>
              <span>CodeChef Rating</span>
              <span>{codechefRating !== null ? codechefRating : "—"}</span>
            </Option>

            <Divider />
            <Option
              onClick={() => {
                setOpen(false);
                navigate("/settings");
              }}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Option>

            <Option onClick={logout}>
              <LogOut size={16} /> Logout
            </Option>
          </Dropdown>
        )}
      </AnimatePresence>

   
      {showLCModal && (
        <ModalBackdrop>
          <ModalBox>
            <h3>Enter LeetCode Handle</h3>
            <Input
              placeholder="LeetCode username"
              value={lcHandle}
              onChange={(e) => setLcHandle(e.target.value)}
            />
            <SaveBtn onClick={handleSaveLeetcode}>Save</SaveBtn>
          </ModalBox>
        </ModalBackdrop>
      )}

      {showCCModal && (
        <ModalBackdrop>
          <ModalBox>
            <h3>Enter CodeChef Handle</h3>
            <Input
              placeholder="CodeChef username"
              value={ccHandle}
              onChange={(e) => setCcHandle(e.target.value)}
            />
            <SaveBtn onClick={handleSaveCodechef}>Save</SaveBtn>
          </ModalBox>
        </ModalBackdrop>
      )}
    </ButtonContainer>
  );
}
