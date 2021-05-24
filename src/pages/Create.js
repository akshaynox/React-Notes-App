import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container'
import { FormControlLabel, makeStyles } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
	field: {
		marginTop: 20,
		marginBottom: 20,
		display: 'block'
	}
})

export default function Create() {
	const classes = useStyles();
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [details, setDetails] = useState('');
	const [titleError, setTitleError] = useState(false);
	const [detailsError, setDetailsError] = useState(false);
	const [category, setCategory] = useState('todos');

	const handleSubmit = (e) => {
		e.preventDefault();
		setTitleError(false);
		setDetailsError(false);
		if (title == '') setTitleError(true)
		if (details == '') setDetailsError(true)

		if (title && details) {
			fetch('http://localhost:8000/notes', {
				method: 'POST',
				headers: {'Content-Type': 'Application/json'},
				body: JSON.stringify({ title, details, category})
			}).then(() => history.push('/'))
		}
	}


	return (
		<Container>
			<Typography
				className={classes.title}
				variant='h6'
				component='h2'
				color='textSecondary'
				gutterBottom
			>
				Create a New Note
      </Typography>
			<form noValidate autoComplete='off' onSubmit={handleSubmit}>
				<TextField
					onChange={(e) => setTitle(e.target.value)}
					className={classes.field}
					label='Note Title'
					variant='outlined'
					color='secondary'
					fullWidth
					required
					error={titleError}
				/>
				<TextField
					onChange={(e) => setDetails(e.target.value)}
					className={classes.field}
					label='Details'
					variant='outlined'
					color='secondary'
					multiline
					rows={4}
					fullWidth
					required
					error={detailsError}
				/>
				<FormControl className={classes.field}>
					<FormLabel>Note Category</FormLabel>
					<RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
						<FormControlLabel value='money' control={<Radio />} label="Money" />
						<FormControlLabel value='todos' control={<Radio />} label="Todos" />
						<FormControlLabel value='reminders' control={<Radio />} label="Reminders" />
						<FormControlLabel value='work' control={<Radio />} label="Work" />
					</RadioGroup>
				</FormControl>

				<Button
					className={classes.btn}
					type='submit'
					color='secondary'
					variant='contained'
				>
					Submit
        		</Button>

			</form>

		</Container>
	)
}