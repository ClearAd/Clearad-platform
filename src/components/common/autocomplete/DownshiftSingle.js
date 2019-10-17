import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import Paper from '@material-ui/core/Paper'
import { renderInput, getSuggestions, renderSuggestion } from './common'
import FormHelperText from '@material-ui/core/FormHelperText'

class DownshiftSingle extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dirty: false,
		}
	}

	handleChange = item => {
		const selectedItem = item.value || item.label
		this.props.onChange(selectedItem)
	}

	render() {
		const {
			classes,
			source,
			error,
			label,
			id,
			placeholder,
			helperText,
			errorText,
			showSelected,
			value,
			openOnClick,
			allowCreate,
			validateCreation,
		} = this.props
		const { dirty } = this.state
		const allValues = source //Object.keys(source).map(key => { return { value: key, label: source[key] } })

		return (
			<Downshift
				onChange={this.handleChange}
				itemToString={item => (item || {}).label || item || ''}
				selectedItem={value}
			>
				{({
					getInputProps,
					getItemProps,
					isOpen,
					inputValue,
					selectedItem,
					highlightedIndex,
					toggleMenu,
				}) => (
					<div className={classes.container}>
						{renderInput({
							label,
							value: inputValue,
							fullWidth: true,
							classes,
							InputProps: getInputProps({
								id,
								onFocus: () => openOnClick && toggleMenu(),
								onBlur: () => this.setState({ dirty: true }),
								error: error & dirty,
								errorText: 'TITLE_HELPER',
								placeholder,
							}),
						})}
						{isOpen ? (
							<Paper className={classes.paper} square>
								{getSuggestions(
									inputValue,
									allValues,
									allowCreate,
									validateCreation
								).map((suggestion, index) =>
									renderSuggestion({
										suggestion,
										index,
										itemProps: getItemProps({ item: suggestion }),
										highlightedIndex,
										selectedItem,
										showSelected,
									})
								)}
							</Paper>
						) : null}
						{error && dirty && (
							<FormHelperText id='component-error-text'>
								{errorText}
							</FormHelperText>
						)}
					</div>
				)}
			</Downshift>
		)
	}
}

DownshiftSingle.propTypes = {
	classes: PropTypes.object.isRequired,
}

export default DownshiftSingle
