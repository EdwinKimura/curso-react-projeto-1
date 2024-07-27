import "./styles.css"

export const TextInput = ({ handleChange, searchValue }) => {
    return (
        <input
            className="filter-input"
            type="search"
            onChange={handleChange}
            value={searchValue}
            placeholder="Type you search"
        />
    )
}