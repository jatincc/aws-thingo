import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'html-react-parser';
import React from 'react';
import Dataset from './dataset.json';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
	width: '100%',
	// maxWidth: 360,
	backgroundColor: theme.palette.background.paper,
  },
}));
// const existing = [];
// for (let a = 0; a < Dataset.length; a++) {
// 	const elementA = Dataset[a];
// 	for (let b = 0; b < Dataset.length; b++) {
// 		const elementB = Dataset[b];
// 		if (existing.indexOf(a) !== -1) {
// 			continue;
// 		}
// 		if (a !== b && elementA.question === elementB.question) {
// 			existing.push(b);
// 			console.log(elementA.id, '=', elementB.id);
// 			for (let ans = 0; ans < elementB.answers.length; ans++) {
// 				const elementAns = elementB.answers[ans];
// 				if (elementAns.correct !== elementA.answers[ans].correct) {
// 					console.log(elementAns.body, '!',elementA.answers[ans].body)
// 				}
// 			}
// 		}
// 	}
// }
// console.log(existing.length)

export default function CheckboxList({darkMode, onDarkMode}) {
	const classes = useStyles();
	const [checked, setChecked] = React.useState([]);
	const [questions, setQuestions] = React.useState(Dataset.map((_,a) => a));
	const [randomIndex, setRandomIndex] = React.useState(Math.floor(Math.random() * questions.length));
	const [wrong, setWrong] = React.useState(false);

	// console.log( questions, randomIndex);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
		newChecked.push(value);
		} else {
		newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleSubmit = () => {
		const ans = [];
		Dataset[questions[randomIndex]].answers.forEach((item, count) => {
			if (item.correct) {
				ans.push(count);
			}
		});
		const isEqual = (JSON.stringify(ans.sort()) === JSON.stringify(checked.sort()));

		if (!isEqual) {
			setWrong(true);
		} else {
			handleAccurateAnswer();
			handleNext();
		}
	}

	const handleAccurateAnswer = () => {
		let newQuestions = questions;
		newQuestions.splice(randomIndex, 1);
		setQuestions(newQuestions);
	}

	const handleNext = () => {
		setRandomIndex(Math.floor(Math.random() * questions.length));
		setChecked([]);
		setWrong(false);
	}

	return (
		<>
			<List className={classes.root}
				component="nav"
				subheader={
					<div style={{
									display: 'flex',
									alignItems:'center'
								}}>
						
					<Switch
						checked={darkMode}
						onChange={onDarkMode}
						name="checkedA"
						inputProps={{ 'aria-label': 'secondary checkbox' }}
					/>
					<ListSubheader disableSticky component="li" id="nested-list-subheader">
						{`${questions.length} Questions left`}
					</ListSubheader>
					</div>
			}>
				<ListItem key={45} role={undefined}  >

					<ListItemText id={'question'} >
							{
								parse(`<Typography style="fontSize:12px;">${Dataset[questions[randomIndex]].question}</Typography>`)
							}
					</ListItemText>

				</ListItem>
				{Dataset[questions[randomIndex]].answers.map((value, count) => {
					const labelId = `checkbox-list-label-${count}`;

					return (
					<ListItem key={count} role={undefined} dense button onClick={handleToggle(count)}>
						{/* <ListItemIcon>
						</ListItemIcon> */}
								<ListItemText dense secondaryTypographyProps={{
									variant: 'caption',
								}} id={labelId}  >

								<div style={{
									display: 'flex',
									alignItems:'center'
								}}>
									<Checkbox
										edge="start"
										checked={checked.indexOf(count) !== -1}
										tabIndex={-1}
										disableRipple
										size='small'
										style={{
											color: wrong && (value.correct ? 'green':'red')
										}}
										inputProps={{ 'aria-labelledby': labelId }}
									/>
									<div style={{
										fontSize: '12px',
										color: wrong && (value.correct ? 'green':'red')
									}}>
										{value.body}
									</div>
								</div>
								</ListItemText>
					</ListItem>
					);
				})}
			</List>
			<div style={{ textAlign:'center', paddingTop:'20px'}}>
				{
					!wrong
						?
						<Button onClick={handleSubmit} variant="contained" color="primary">
							Submit
						</Button>
						:
						<Button onClick={handleNext} variant="contained" color="primary">
							Next
						</Button>
				
				}
			</div>
		</>
	);
}