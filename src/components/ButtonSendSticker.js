import React from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    IconButton,
    InputAdornment,
    ImageList,
    ImageListItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import appConfig from "../../config.json";

export default function ButtonSendSticker(props) {
    const [isOpen, setOpenState] = React.useState("");
    const scroll = useTheme().scroll;

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <IconButton
                aria-label="add to shopping cart"
                sx={{
                    color: "chat.sticker.button",
                }}
                onClick={() => setOpenState(!isOpen)}
            >
                <EmojiEmotionsIcon fontSize="large" />
            </IconButton>

            {isOpen && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: "5px",
                        position: "absolute",
                        backgroundColor: "chat.sticker.box.background",
                        width: {
                            // xs: "220px",
                            xs: "80vw",
                            sm: "70vw",
                        },
                        height: {
                            xs: "400px",
                            sm: "600px",
                            },
                        bottom: "56px",
                        zIndex: "10000",
                        left: "5px",
                        padding: "10px 0 10px",
                        boxShadow:
                            "rgba(4, 4, 5, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.24) 0px 8px 16px 0px",
                        "& .stickFeed": scroll,
                    }}
                    onClick={() => setOpenState(false)}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: "chat.sticker.title",
                            fontWeight: "bold",
                        }}
                    >
                        Stickers
                    </Typography>
                    <ImageList className="stickFeed" cols={3} gap={10}>
                        {appConfig.stickers.map((sticker) => (
                            <ImageListItem
                                key={sticker}
                                onClick={() => {
                                    console.log('[DENTRO DO COMPONENTE] Clicou no sticker:', sticker);
                                    if (Boolean(props.onStickerClick)) {
                                        props.onStickerClick(sticker);
                                    }
                                }}
                                sx={{
                                    padding: "10px",
                                    borderRadius: "5px",
                                    "&:hover": {
                                        backgroundColor: "chat.sticker.imageList.hover",
                                    },
                                    "&:focus": {
                                        backgroundColor: "chat.sticker.imageList.focus",
                                    },
                                    "&:active": {
                                        backgroundColor: "chat.sticker.imageList.active",
                                    },

                                }}
                            >
                                <img
                                    src={`${sticker}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${sticker}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    // alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            )}
        </Box>
    );
}
