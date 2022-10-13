package auth

import "log"

func (h *AuthHandler) handleSignIn() {

	token, err := h.FirebaseAuth.VerifyIDToken(h.FiberCtx, idToken)
	if err != nil {
		log.Fatalf("error verifying ID token: %v\n", err)
	}
}
