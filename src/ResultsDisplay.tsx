import { Box, styled } from "@mui/material";
import { BMIDisplay } from "./BmiDisplay";
import { CalorieDisplayCard } from "./CalorieDisplayCard";
import { IdealWeightDisplay } from "./IdealWeightDisplay";
import { TDEEResults } from "./TDEECalculator";
import { TDEEResultsTable } from "./TDEEResultsTable";
import { useSmallScreenMediaQuery } from "./useSmallScreenMediaQuery";

const DisplayBox = styled(Box)(`
    display: flex;
    flex-direction: column;
    padding: 10px;
    flex-grow: 1;
    max-width: 860px;
`);

export interface IResultsDisplayProps {
    result: TDEEResults;
}

export const ResultsDisplay = ({ result }: IResultsDisplayProps) => {
    const isSmallScreen = useSmallScreenMediaQuery();
    const bottomMargin = 10;
    return (
        <DisplayBox sx={{ paddingTop: `${isSmallScreen ? 0 : 10}px` }}>
            {/* <Box sx={{ display: "flex", justifyContent: "center", margin: `${bottomMargin}px` }}>
                <Typography variant="h6">Results</Typography>
            </Box> */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <CalorieDisplayCard
                        sx={{ margin: `${bottomMargin}px`, flexGrow: 1 }}
                        calories={result.bmr}
                        description="Basal Metabolic Rate (BMR)"
                        shortDescription="BMR"
                    />
                    <CalorieDisplayCard
                        sx={{ margin: `${bottomMargin}px`, flexGrow: 1 }}
                        calories={result.tdee.get(result.activity)}
                        activity={result.activity}
                        description="Total Daily Energy Expenditure (TDEE)"
                        shortDescription="TDEE"
                    />
                </Box>
                <Box>
                    <TDEEResultsTable sx={{ margin: `${bottomMargin}px` }} tdeeMap={result.tdee} selectedActivityFactor={result.activity} />
                </Box>
                <Box>
                    <BMIDisplay sx={{ margin: `${bottomMargin}px` }} heightCm={result.input.height} weightKg={result.input.weight} />
                </Box>
                <Box>
                    <IdealWeightDisplay
                        sx={{ margin: `${bottomMargin}px` }}
                        heightInCm={result.input.height}
                        gender={result.input.gender}
                        weightInKg={result.input.weight}
                    />
                </Box>
            </Box>
        </DisplayBox>
    );
};
