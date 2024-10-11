
const calculateBmi = (height: number, weight: number) => {
    const bmi: number = 10000*weight/(height*height)

    if (bmi < 18.5) return 'Under Range'
    if (bmi < 25) return 'Normal Range'
    return 'Over Range'
}

console.log(calculateBmi(181, 81))