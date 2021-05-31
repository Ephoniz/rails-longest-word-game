require 'open-uri'
require 'json'

class GamesController < ApplicationController
  def new
    @letters = (1..10).map do
      ('A'..'Z').to_a[rand(26)]
    end
  end

  def score
    grid = params[:grid].scan(/[A-Za-z]/)
    @word = params[:word]
    @info = {
      message: '',
      score: 0
    }
    @results = giving_results(word_in_the_grid(@word.upcase.chars, grid), english_word?(@word), @info, @word)
  end

  def giving_results(is_grid, is_english, info, attempt)
    if is_grid && is_english
      info[:message] = 'a valid word'
      info[:score] = attempt.length
    elsif !is_english
      info[:message] = 'not an english word'
    else
      info[:message] = 'not in the grid'
    end
    info
  end

  def word_in_the_grid(attempt_arr, grid)
    grid.each do |element|
      index = attempt_arr.find_index(element)
      attempt_arr.delete_at(index) unless index.nil?
    end
    attempt_arr.empty?
  end

  def english_word?(attempt)
    url = "https://wagon-dictionary.herokuapp.com/#{attempt}"
    word_serialized = URI.open(url).read
    word = JSON.parse(word_serialized)
    word['found']
  end
end
