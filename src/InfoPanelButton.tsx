import CloseIcon from "@mui/icons-material/Close";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { AppBar, Backdrop, Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Slide, styled, Toolbar, Typography } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import "katex/dist/katex.min.css";
import { forwardRef, useState } from "react";
import { BlockMath, InlineMath } from "react-katex";
import { SquareButton } from "./SquareButton";
import { useSmallScreenMediaQuery } from "./useSmallScreenMediaQuery";

export const Paragraph = styled(Typography)`
    padding-bottom: 10px;
`;

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any>;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export interface IInfoPanelButtonProps {}

export const InfoPanelButton = ({}: IInfoPanelButtonProps) => {
    const isSmallScreen = useSmallScreenMediaQuery();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <Box>
            <SquareButton onClick={handleOpen}>
                <HelpOutlineIcon fontSize="small" />
            </SquareButton>
            <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={open}>
                <Dialog open={open} fullScreen TransitionComponent={Transition}>
                    {!isSmallScreen && (
                        <AppBar sx={{ position: "relative" }}>
                            <Toolbar>
                                <IconButton sx={{ flexGrow: 1, justifyContent: "right" }} autoFocus color="inherit" onClick={handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    )}
                    <DialogTitle>The Math</DialogTitle>
                    <DialogContent>
                        <Paragraph>
                            Below is the information on how the stats in the site are calculated (currently incomplete but more information will be
                            added as time goes on).
                        </Paragraph>
                        <Typography variant="h6">Basal Metabolic Rate (BMR)</Typography>
                        <Paragraph>
                            BMR is the rate of energy expenditure per unit time by endothermic animals at rest. There are several formulas that can be
                            used, this page uses Mifflin St Jeor (if not using body fat %) and Katch Mccardle (if using body fat %). These are as
                            follows:
                        </Paragraph>
                        <Paragraph>
                            BMR equations follow the pattern
                            <BlockMath>P= C_w w + C_h h + C_a + C</BlockMath>
                            where <InlineMath>P</InlineMath> is the total heat production at complete rest in kcal/day, <InlineMath>C_w</InlineMath>
                            is a factor to multiply weight <InlineMath>w</InlineMath>, <InlineMath>C_h</InlineMath>
                            is a factor to multiply height <InlineMath>h</InlineMath>, <InlineMath>C_a</InlineMath>
                            is a factor to multiply age <InlineMath>a</InlineMath>, <InlineMath>C</InlineMath>
                            is a constant value.
                        </Paragraph>
                        <Paragraph>
                            These take the following values
                            <BlockMath>C_w = 10.0 \\ C_h = 6.25 \\ C_a = 5.0 \\ C = 5.0 (Male), -161.0 (Female) </BlockMath>
                        </Paragraph>
                        {/* <Typography variant="h6">Total Daily Enery Expenditure (TDEE)</Typography>
                        <Paragraph>Calculating TDEE first requires us to calculate the , </Paragraph> */}
                    </DialogContent>
                    {isSmallScreen && (
                        <Button sx={{ borderRadius: 0 }} variant="contained" disableElevation onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </Button>
                    )}
                </Dialog>
            </Backdrop>
        </Box>
    );
};
