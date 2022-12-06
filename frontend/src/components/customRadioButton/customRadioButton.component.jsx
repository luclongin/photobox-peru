const CustomRadioButton = ({size, checked}) => {
    // If selected, color of radio changes
    const getStroke = (checked) => {
        if(checked) {
              return "#FF66C4";
        } else {
              return "#BCB7BC"
        };
    }


      // Homemade RadioButton
      const RadioButton = ({ checked }) => (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fontSize={size}>
            <circle
                cx="50%"
                cy="50%"
                r="11px"
                stroke={getStroke(checked)}

                strokeWidth="1px"
                fill="none"
            />
            {checked && (
                <circle
                    cx="50%"
                    cy="50%"
                    r="6px"
                    fill="#FF66C4"
                />
            )}
        </svg>
    );

    return(
        <RadioButton checked={checked} />
    );


}

export default CustomRadioButton;