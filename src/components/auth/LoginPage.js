import React from 'react'

export const LoginPage = () => {
    return (
        <>
            <h1>Login Page</h1>
            <form>
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                />
                <button
                    type="submit"
                >
                    Login
                </button>
                <hr/>
                Google
            </form>
        </>
    )
}
