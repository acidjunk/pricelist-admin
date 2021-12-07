import red from "@material-ui/core/colors/red";
import { createTheme } from "@material-ui/core/styles";

export const adminTheme = createTheme({
    palette: {
        primary: {
            main: "#237325"
        },
        secondary: {
            main: "#116113"
        },
        error: red,
        contrastThreshold: 3,
        tonalOffset: 0.2
    },
    overrides: {
        MuiFormLabel: {
            // override the styles of all instances of this component
            root: {
                // Name of the rule
                // fontSize: '1.4em', // Some CSS
                fontWeight: "bold", // Some CSS
                color: "#237325", // Some CSS
                marginBottom: "-5px"
            }
        }
    }
});
