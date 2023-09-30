export interface CustomTheme {
    palette: {
        mode: string;
        primary: {
            dark: string;
            main: string;
            light: string;
        };
        neutral: {
            dark: string;
            main: string;
            mediumMain: string;
            medium: string;
            light: string;
        };
        background: {
            default: string;
            alt: string;
        };
    };
    typography: {
        fontFamily: string;
        fontSize: number;
        h1: {
            fontFamily: string;
            fontSize: number;
        };
        // Define otros estilos de tipografía si es necesario
    };
};