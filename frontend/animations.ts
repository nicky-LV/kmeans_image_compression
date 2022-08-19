export const fade = {
    "initial": {
        opacity: "0%"
    },
    "animate": {
        opacity: "100%"
    },
    "exit": {
        opacity: "0%"
    }
}

export const delayedFade = {
    "initial": {
        opacity: "0%"
    },
    "animate": {
        opacity: "100%",
        transition: {
            delay: 1
        }
    },
    "exit": {
        opacity: "0%"
    }
}

export const halfFadeOut = {
    "initial": {
        opacity: "100%",
        transition: {
            type: "linear"
        }
    },
    "animate": {
        opacity: "100%",
        transition: {
            type: "linear"
        }
    },
    "exit": {
        opacity: "50%",
        transition: {
            type: "linear"
        }
    }
}


export const stagger = {
    "animate": {
        transition: {
            staggerChildren: 0.5
        }
    }
}