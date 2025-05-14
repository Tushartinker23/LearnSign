import React, { useState } from 'react';
import wordList from './wordjson.json';
import styled from "styled-components";
import backgroundImg from "../assets/images/download1.jpg";

const StyledWrapper = styled.div`
  color: rgb(40, 44, 52);
  background-image: url(${backgroundImg});
  background-size: cover;
  height: auto;
  padding: 20px 0 0 0;
`;

const StyledAppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: poppins;
  align-items: center;
  gap: 12px;
  @media only screen and (max-width: 680px) {
    padding-top: 40px;
  }
`;

const StyledAppBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const StyledH1 = styled.h1`
  font-size: 28px;
  padding: 0;
  margin: 0;
  text-align: center;
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }
`;

const StyledContentBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const StyledDescription = styled.div`
  text-align: center;
  margin: 4px;
  max-width: 50rem;
  font-size: 14px;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    padding: 0;
    max-width: 70%;
  }
`;

const StyledIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
//   max-width: 1200px;
//   margin: 0 auto;
  padding: 20px;
`;

export default function WordList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const openModal = (embedId) => {
        setSelectedVideo(embedId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVideo(null);
    };

    const filteredWords = Object.values(wordList).filter(word =>
        word.sign.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <StyledWrapper>
            <StyledAppContainer>
                <StyledAppBar>
                    <StyledIntroContainer>
                        {/* <StyledDescription>Test</StyledDescription> */}
                    </StyledIntroContainer>
                </StyledAppBar>
                        <StyledH1>Word List</StyledH1>
                <StyledContentBody style={{ background: "none" }}>
                    <TimelineContainer>
                        <div className="word-list-container">
                            <div className="search-container">
                                <input
                                    type="text"
                                    placeholder="Search words..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <div className="word-grid">
                                {filteredWords.length > 0 ? (
                                    filteredWords.map((word, index) => (
                                        <button
                                            key={index}
                                            className="word-item"
                                            onClick={() => openModal(word.yt_embedId)}
                                        >
                                            {word.sign}
                                        </button>
                                    ))
                                ) : (
                                    <p className="no-results">No words found</p>
                                )}
                            </div>

                            {isModalOpen && (
                                <div className="modal-overlay" onClick={closeModal}>
                                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                                        <button className="close-button" onClick={closeModal}>
                                            ×
                                        </button>
                                        <iframe
                                            className="video-frame"
                                            src={`https://www.youtube.com/embed/${selectedVideo}?controls=0&autoplay=1&mute=1&loop=1&playlist=${selectedVideo}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            title="Embedded youtube"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </TimelineContainer>
                </StyledContentBody>
            </StyledAppContainer>

            <style jsx global>{`
                .word-list-container {
                    padding: 20px;
                    width:80%;
                    // max-width: 1200px;
                    // margin: 0 auto;
                }

                .search-container {
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: center;
                }

                .search-input {
                    width: 100%;
                    max-width: 400px;
                    padding: 10px 15px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    font-size: 16px;
                    outline: none;
                    transition: border-color 0.3s ease;
                }

                .search-input:focus {
                    border-color: #007bff;
                }

                .word-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                    gap: 15px;
                    margin-bottom: 20px;
                }

                .word-item {
                    padding: 15px;
                    background: #f0f0f0;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .word-item:hover {
                    background: #e0e0e0;
                    transform: translateY(-2px);
                }

                .no-results {
                    text-align: center;
                    color: #666;
                    padding: 20px;
                    grid-column: 1 / -1;
                }

                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1000;
                }

                .modal-content {
                    position: relative;
                    background: white;
                    padding: 0px;
                    border-radius: 10px;
                    width: 90%;
                    max-width: 800px;
                }

                .close-button {
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    border: none;
                    background: none;
                    font-size: 50px;
                    cursor: pointer;
                    padding: 5px;
                }

                .video-frame {
                    width: 100%;
                    height: 450px;
                    border: none;
                    border-radius: 5px;
                }

                @media (max-width: 768px) {
                    .word-grid {
                        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                        gap: 10px;
                    }

                    .word-item {
                        padding: 10px;
                        font-size: 14px;
                    }

                    .modal-content {
                        width: 95%;
                        padding: 10px;
                    }

                    .video-frame {
                        height: 300px;
                    }

                    .search-input {
                        max-width: 300px;
                    }
                }

                @media (max-width: 480px) {
                    .word-grid {
                        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
                    }

                    .video-frame {
                        height: 200px;
                    }

                    .search-input {
                        font-size: 14px;
                    }
                }
            `}</style>
        </StyledWrapper>
    );
}