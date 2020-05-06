import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress, Fab } from '@material-ui/core'
import { Check, Save } from '@material-ui/icons'

import color from '@material-ui/core/colors/purple'

export const styles = theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
	},
	wrapper: {
		position: 'relative',
	},
	buttonSuccess: {
		backgroundColor: color[500],
		'&:hover': {
			backgroundColor: color[700],
		},
	},
	fabProgress: {
		color: color[500],
		position: 'absolute',
		top: -6,
		left: -6,
		zIndex: 1,
	},
	buttonProgress: {
		color: color[500],
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12,
	},
})

const useStyles = makeStyles(styles)

export const SaveBtn = ({
	spinner,
	success,
	dirtyProps = [],
	save,
	disabled,
}) => {
	const classes = useStyles()
	return (
		!!dirtyProps.length && (
			<div className={classes.wrapper}>
				<Fab
					color='primary'
					onClick={save}
					disabled={disabled || spinner || !dirtyProps.length}
				>
					{/*TODO: Success */}
					{success ? <Check /> : <Save />}
				</Fab>
				{!!spinner && (
					<CircularProgress size={68} className={classes.fabProgress} />
				)}
			</div>
		)
	)
}
