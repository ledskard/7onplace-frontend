const delayLoadingAsyncRandom = async (min: number = 1000, max: number = 5000) => {
  const delay = Math.floor(Math.random() * (max - min + 1) + min)

  return new Promise((resolve) => setTimeout(resolve, delay))
}

export { delayLoadingAsyncRandom }
