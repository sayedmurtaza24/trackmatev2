package types

type FieldOption struct {
	Name       string `json:"name"`
	ValueRange uint   `json:"valueRange"`
}

type AssessmentField struct {
	Name    string `json:"name"`
	Value   uint   `json:"value"`
	Comment string `json:"comment"`
}
