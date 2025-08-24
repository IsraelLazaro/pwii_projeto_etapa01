import React, { useEffect, useState } from "react";
import { api } from "../../../api";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { UserHeader } from "../../components/UserHeader";
import { LongLogo } from "../../components/LongLogo";
import { FiX, FiHeart } from "react-icons/fi";
import { getCityPets } from "../../services/apiPets";
import type { Pet } from "../../services/apiPets";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import "./ScanPet.css";

export default function ScanPet() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await getCityPets();
        setPets(data);
      } catch (err) {
        console.error("❌ Erro ao carregar pets:", err);
      }
    }
    fetchPets();
  }, []);

  const currentPet = pets[currentIndex];

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300); 
  };

  return (
    <div className="safe-area">
      <ThemedView variant="container" style={styles.container}>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <LongLogo type="profile" />
             <div  className='click-img-profile'>
                <UserHeader
                  userName={user?.userName || "Usuário"}
                  avatarUrl={
                    user?.profilePicture
                      ? `${api.getUri()}/uploads/${user.profilePicture}`
                      : "/assets/images/default_user.svg"
                  }
                  showEditIcon={false}
                  onClick={() => navigate('/Profile')} 
                />

            </div>
          </div>
        <AnimatePresence mode="popLayout">
          {currentPet ? (
            <motion.div
              key={currentPet._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                x: direction === "left" ? -300 : 300,
                rotate: direction === "left" ? -20 : 20,
                transition: { duration: 0.3 },
              }}
              style={styles.petCard}
            >
              <img
                src={
                  currentPet.photos?.[0]
                    ? `${api.getUri()}/uploads/${currentPet.photos[0]}`
                    : "/assets/images/logo-pet.png"
                }
                alt={currentPet.name}
                style={styles.petImage}
              />

              <div style={styles.petInfo}>
                <ThemedText
                  type="title"
                  style={{ color: "#000000ff", fontWeight: "bold" }}
                >
                  {currentPet.name}
                </ThemedText>
                <ThemedText type="body" style={{ color: "#666" }}>
                  {currentPet.breed} • {currentPet.age} anos
                </ThemedText>
                <ThemedText
                  type="body"
                  style={{ marginTop: 8, color: "black" }}
                >
                  {currentPet.description}
                </ThemedText>
              </div>
            </motion.div>
          ) : (
            <ThemedText type="title">Nenhum pet encontrado 😢</ThemedText>
          )}
        </AnimatePresence>
        {currentPet && (
          <div style={styles.actions}>
            <button
              className="dislike-button"
              onClick={() => handleSwipe("left")}
            >
              <FiX size={28} color="#fff" />
            </button>
            <button
              className="like-button"
              onClick={() => handleSwipe("right")}
            >
              <FiHeart size={28} color="#fff" />
            </button>
          </div>
        )}
      </ThemedView>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    flex: 1,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    maxWidth: "400px",
    margin: "0 auto",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 16,
  },
  petCard: {
    width: "100%",
    height: "400px",
    borderRadius: 16,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  petImage: {
    width: "100%",
    height: "70%",
    objectFit: "cover",
  },
  petInfo: {
    display: "flex",
    flexDirection: "column",
    padding: 12,
    textAlign: "center",
  },
  actions: {
    display: "flex",
    gap: 40,
    marginTop: 20,
  },
};
