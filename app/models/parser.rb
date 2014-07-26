#parses the input
class Parser

  def initialize calculator
    @calculator = calculator
    @router = Router.new(calculator)
  end

  def parse(input)
    i = input.split(" ")
    [i[0], i[1].to_i]
  end

  def operation(input)
    parsed_input =parse(input)
    @router.map(parsed_input)
  end
  
end