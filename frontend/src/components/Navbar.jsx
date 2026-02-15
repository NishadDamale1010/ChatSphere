import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div
            style={{
                backgroundColor: "#1f2937",
                padding: "12px 24px",
                position: "fixed",
                top: 0,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "white",
                zIndex: 1000,
            }}
        >
            <h1 style={{ margin: 0 }}>ChatSphere</h1>

            <div style={{ display: "flex", gap: "20px" }}>
                <Link style={linkStyle} to="/">Home</Link>
                <Link style={linkStyle} to="/signup">Signup</Link>
                <Link style={linkStyle} to="/login">Login</Link>
                <Link style={linkStyle} to="/Profile">Profile</Link>
                <Link style={linkStyle} to="/Setting">Setting</Link>
            </div>
        </div>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
};

export default Navbar;
