"use client";

import React, { useState } from "react";
import styles from "../inbox.module.css";

interface Message {
  id: number;
  sender: "user" | "agent";
  text: string;
  time: string;
}

interface ChatThread {
  id: number;
  name: string;
  initials: string;
  role: string;
  status: string;
  messages: Message[];
}

const INITIAL_THREADS: ChatThread[] = [
  {
    id: 1,
    name: "CS TiketKu 24/7",
    initials: "CS",
    role: "Layanan Pelanggan",
    status: "Online",
    messages: [
      {
        id: 1,
        sender: "agent",
        text: "Halo! Selamat datang di layanan bantuan TiketKu. Ada yang bisa kami bantu terkait pemesanan penerbangan atau promo hari ini?",
        time: "14:20",
      },
      {
        id: 2,
        sender: "user",
        text: "Halo min, saya mau tanya cara pakai kode promo TIKETKU2026 untuk tiket ke Bali.",
        time: "14:22",
      },
      {
        id: 3,
        sender: "agent",
        text: "Kode TIKETKU2026 bisa langsung dimasukkan di halaman pembayaran pada kolom 'Gunakan Promo' sebelum memilih metode bayar ya kak.",
        time: "14:23",
      },
    ],
  },
  {
    id: 2,
    name: "Garuda Indonesia Support",
    initials: "GA",
    role: "Mitra Maskapai",
    status: "Online",
    messages: [
      {
        id: 1,
        sender: "agent",
        text: "E-Tiket Anda untuk rute Jakarta (CGK) → Bali (DPS) telah aktif. Silakan lakukan check-in online maksimal 24 jam sebelum keberangkatan.",
        time: "10:05",
      },
    ],
  },
  {
    id: 3,
    name: "Pusat Refund & Reschedule",
    initials: "RR",
    role: "Tim Perubahan Jadwal",
    status: "Aktif 5 menit lalu",
    messages: [
      {
        id: 1,
        sender: "agent",
        text: "Pengajuan perubahan jadwal dapat diproses hingga 6 jam sebelum waktu keberangkatan sesuai kebijakan masing-masing maskapai.",
        time: "Kemarin",
      },
    ],
  },
];

const QUICK_REPLIES = [
  "Cek status e-tiket saya",
  "Cara reschedule penerbangan",
  "Syarat klaim kode promo",
];

export default function ChatPage() {
  const [threads, setThreads] = useState<ChatThread[]>(INITIAL_THREADS);
  const [activeId, setActiveId] = useState<number>(1);
  const [inputText, setInputText] = useState<string>("");

  const activeThread =
    threads.find((thread) => thread.id === activeId) || threads[0];

  const getAutoReply = (question: string): string => {
    if (question === "Cek status e-tiket saya") {
      return "Status E-Tiket Anda saat ini AKTIF & TERKONFIRMASI. Detail boarding pass dapat dilihat di menu Pesanan.";
    }
    if (question === "Cara reschedule penerbangan") {
      return "Untuk reschedule, buka menu Pesanan → pilih tiket aktif → klik 'Ubah Jadwal' maksimal 6 jam sebelum terbang.";
    }
    if (question === "Syarat klaim kode promo") {
      return "Kode promo berlaku untuk 1x transaksi per akun selama kuota harian masih tersedia pada halaman pembayaran.";
    }
    return "Terima kasih atas pesan Anda. Tim kami sedang mengecek detail pesanan Anda dan akan segera merespons.";
  };

  const handleSendMessage = (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const now = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nextId = activeThread.messages.length + 1;

    const userMsg: Message = {
      id: nextId,
      sender: "user",
      text: trimmed,
      time: now,
    };

    const autoReplyMsg: Message = {
      id: nextId + 1,
      sender: "agent",
      text: getAutoReply(trimmed),
      time: now,
    };

    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === activeThread.id
          ? {
              ...thread,
              messages: [...thread.messages, userMsg, autoReplyMsg],
            }
          : thread
      )
    );

    setInputText("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className={styles.chatCard}>
      <div className={styles.chatListPane}>
        <div className={styles.chatListHeader}>
          <h2 className={styles.chatListTitle}>Pesan &amp; Bantuan</h2>
        </div>

        <div className={styles.chatListItems}>
          {threads.map((thread) => {
            const lastMsg = thread.messages[thread.messages.length - 1];
            const isSelected = thread.id === activeThread.id;
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveId(thread.id)}
                className={`${styles.chatThreadItem} ${
                  isSelected ? styles.chatThreadActive : ""
                }`}
              >
                <div className={styles.chatAvatar}>{thread.initials}</div>
                <div className={styles.chatThreadInfo}>
                  <div className={styles.chatThreadTop}>
                    <span className={styles.chatThreadName}>{thread.name}</span>
                    <span className={styles.chatThreadTime}>
                      {lastMsg?.time}
                    </span>
                  </div>
                  <p className={styles.chatThreadPreview}>{lastMsg?.text}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.chatRoomPane}>
        <div className={styles.chatRoomHeader}>
          <div className={styles.chatAvatar}>{activeThread.initials}</div>
          <div>
            <h3 className={styles.chatThreadName}>{activeThread.name}</h3>
          </div>
        </div>

        <div className={styles.chatMessagesArea}>
          {activeThread.messages.map((msg, index) => {
            const isLastAgentMessage =
              msg.sender === "agent" &&
              index === activeThread.messages.length - 1;

            return (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${
                  msg.sender === "user"
                    ? styles.messageOutgoing
                    : styles.messageIncoming
                }`}
              >
                <div
                  className={
                    msg.sender === "user"
                      ? styles.messageBubbleOutgoing
                      : styles.messageBubbleIncoming
                  }
                >
                  {msg.text}
                </div>
                <span className={styles.messageTime}>{msg.time}</span>

                {isLastAgentMessage && (
                  <div className={styles.inlineQuickReplies}>
                    {QUICK_REPLIES.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSendMessage(prompt)}
                        className={styles.quickReplyChip}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className={styles.chatInputForm}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Tulis pesan untuk CS atau maskapai..."
            className={styles.chatInput}
          />
          <button type="submit" className={styles.chatSendBtn}>
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
}