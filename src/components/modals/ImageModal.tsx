import React from "react";
import Modal from "react-modal";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    images: string[];
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, images }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Structure Images"
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        >
            <div className="bg-gray-800 p-6 rounded-lg w-[90%] max-w-4xl h-[90vh] max-h-[90vh] relative flex flex-col">
                <button className="absolute top-2 right-2 text-white text-2xl" onClick={onClose}>
                    <FaTimes />
                </button>
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Structure Images</h2>
                <div className="flex-1 flex items-center justify-center relative">
                    <Carousel
                        showArrows={true}
                        infiniteLoop={true}
                        showThumbs={false}
                        renderArrowPrev={(onClickHandler, hasPrev) =>
                            hasPrev && (
                                <button
                                    onClick={onClickHandler}
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
                                >
                                    <FaChevronLeft />
                                </button>
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext) =>
                            hasNext && (
                                <button
                                    onClick={onClickHandler}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-10"
                                >
                                    <FaChevronRight />
                                </button>
                            )
                        }
                    >
                        {images.map((img, index) => (
                            <div key={index} className="flex items-center justify-center h-full">
                                <img
                                    src={img}
                                    alt={`Structure Image ${index + 1}`}
                                    className="max-w-full max-h-[75vh] object-contain"
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </Modal>
    );
};

export default ImageModal;
