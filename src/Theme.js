import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

export const adminTheme = createMuiTheme({
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
    }
});
