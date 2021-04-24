
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import Quiz from './Quiz';

function App() {

	const [darkMode, setDarkMode] = React.useState(true);
	
	const theme = React.useMemo(
	() =>
		createMuiTheme({
		palette: {
			type: darkMode ? 'dark' : 'light',
		},
		}),
	[darkMode],
	);

	const handleDarkMode = () => {
		setDarkMode(!darkMode);
	}

	return (
	<ThemeProvider theme={theme}>
		<CssBaseline/>
		<Quiz darkMode={darkMode} onDarkMode={handleDarkMode} />
	</ThemeProvider>
	);
}

ReactDOM.render(<App />, document.querySelector('#root'));
    