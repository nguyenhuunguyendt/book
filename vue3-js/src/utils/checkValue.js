const checkValue = (value) => {
    let err = false
    for (const key in value) {
        if (!value[key]) {
            alert(`${key} is require`)
            return true
        }
    }
    if (typeof value.year !== "number" && value.year < 1800 || typeof value.quantity !== "number" && value.year < 0) {
        err = "năm hoặc số lượng phải là số và lớn hơn 1800 và 0"
        alert(err)
        return true
    }
    return false
}
export default checkValue