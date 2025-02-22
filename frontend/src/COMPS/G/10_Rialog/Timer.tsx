import { useState, useEffect } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";
import {useRialogStore} from "./RialogStore";

const CountdownTimer = ({ answerTime }: { answerTime: number }) => {
    const {usedTime, setUsedTime } = useRialogStore();
  useEffect(() => {
    if (usedTime >= answerTime) return;
    const timer = setInterval(() => {
        if(usedTime >= 2*answerTime) return;
        setUsedTime((prev) => Math.max(prev + 10 / 1000, 0));
    }, 10);
    return () => clearInterval(timer);
  }, []);

  // Xác định màu sắc dựa trên thời gian còn lại
  const getColor = () => {
    if ((answerTime-usedTime) > answerTime * 0.5) return "#4caf50"; // Xanh lá
    if ((answerTime-usedTime) * 0.2) return "#ff9800"; // Vàng
    return "#f44336"; // Đỏ
  };

  return (
    <Box width="100%" py={2} sx={{backgroundColor: "white"}}>
      {/* Thanh tiến trình */}
      <motion.div
        animate={{ backgroundColor: getColor() }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <LinearProgress
          variant="determinate"
          value={((answerTime-usedTime) / answerTime) * 100}
          sx={{
            height: 10,
            // borderRadius: 5,
            backgroundColor: "gray",
            "& .MuiLinearProgress-bar": { backgroundColor: getColor() },
          }}
        />
      </motion.div>

      {/* Hiển thị số giây còn lại */}
      <Box display="flex" justifyContent="center" mt={1}>
        <motion.div
          animate={{ color: getColor() }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Typography variant="h5" fontWeight="bold">
            {(answerTime-usedTime).toFixed(0)}s
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default CountdownTimer;
