import React, { useState, useEffect }  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TopBar from "Components/topBar.jsx";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import GameWindow from 'Components/gameWindow.jsx';

export default function SimpleContainer() {
	const [isLoaded, setLoaded] = useState();
	const startGame = () => {
		// This is required because useEffect gets rendered twice in dev, and was a headache to fix.
		setLoaded(true)
		new Phaser.Game(GameWindow)
	}
  return (
    <React.Fragment>
		<CssBaseline />
		<TopBar fixed/>
		<Container fixed>
			<Box
				m={1}
				//margin
				display="flex"
				justifyContent="center"
  				alignItems="center"
				sx={{ mr: 2 }}
			>
				{/* This is where phaser gets mounted */}
				<div id="phaser"></div>
				{isLoaded
					? null
					: <Button variant="contained" onClick={startGame}>Start Game</Button>
				}
			</Box>
		</Container>
    </React.Fragment>
	
  );
}