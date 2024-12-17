exports.cleanNumber = (number) => {
    let new_number = number.trim().replace(/\D+/g, " ").split(" ");
    if(new_number.length > 1){
      new_number = new_number.join("x");
    }else{
      new_number = new_number[0];
    }
    return new_number;
};

exports.getAlternateNumber = (number,alternateIndex) => {
    let new_number = number.replace("×", " ");
    let left_hand_number = new_number.toString().split(' ')[0];
    let right_hand_number = new_number.toString().split(' ')[1];
    let return_number = '';
    if(left_hand_number && right_hand_number) {
      if(alternateIndex == 1){
        return_number =  [...left_hand_number.toString()].reverse().join('') + 'x' + right_hand_number;
      }else{
        return_number =  left_hand_number + 'x' + [...right_hand_number.toString()].reverse().join('');
      }
    }else{
      return_number = number;
    }
    return return_number;
}