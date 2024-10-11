
const calculateBmi = (height: number, weight: number) => {
    const bmi: number = 10000*weight/(height*height)

    if (bmi < 18.5) return 'Under Range'
    if (bmi < 25) return 'Normal Range'
    return 'Over Range'
}

if (process.argv.length < 4) throw new Error('Not enough arguments');
if (process.argv.length > 4) throw new Error('Too many arguments');
if (isNaN(Number(process.argv[2])) || isNaN(Number(process.argv[3]))) throw new Error('Arguments not numbers')
const height = Number(process.argv[2])
const weight = Number(process.argv[3])

console.log(calculateBmi(height, weight))